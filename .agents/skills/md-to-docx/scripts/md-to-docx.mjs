/**
 * md-to-docx.mjs - Markdown to Word converter
 * Pure JavaScript, no external tools required.
 * Usage: node md-to-docx.mjs <input.md> [output.docx]
 *          [--size=letter|a4|half-letter|half-a4] [--margin=<twips>] [--no-toc] [--no-meta]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { marked } from 'marked'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
  TableRow,
  TableCell,
  Table,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  PageBreak,
} from 'docx'

// --- Image dimensions from PNG header ---
function pngDimensions(buffer) {
  // PNG signature check + IHDR chunk at offset 16 (width) and 20 (height)
  if (buffer[0] === 0x89 && buffer[1] === 0x50) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    }
  }
  return { width: 600, height: 400 } // fallback
}

// --- CLI argument parsing ---
// Positional: <input.md> [output.docx]. Long flags (--name or --name=value)
// may appear anywhere and are collected into `flags`.
const flags = {}
const positional = []
for (const arg of process.argv.slice(2)) {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=')
    flags[key] = value === undefined ? true : value
  } else {
    positional.push(arg)
  }
}
const inputPath = positional[0]
if (!inputPath) {
  console.error(
    'Usage: node md-to-docx.mjs <input.md> [output.docx] [--size=letter|a4|half-letter|half-a4] [--margin=<twips>] [--no-toc] [--no-meta]',
  )
  process.exit(1)
}
const outputPath = positional[1] || inputPath.replace(/\.md$/i, '.docx')
const inputDir = dirname(resolve(inputPath))

// Output options: a short pamphlet or handout wants no TOC and a title page
// without the build-date / version line.
const noToc = flags['no-toc'] === true
const noMeta = flags['no-meta'] === true

const mdSource = readFileSync(inputPath, 'utf-8')

// --- Extract YAML front-matter metadata ---
let title = 'Document'
let subtitle = ''
let date = new Date().toISOString().slice(0, 10)
let version = '1.0'
let audience = ''

// Only treat a leading "---" block as front-matter. Without anchoring to the
// very start of the file, this would instead swallow everything between the
// first two horizontal rules in the document body.
const fmMatch = mdSource.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
if (fmMatch) {
  const fm = fmMatch[1]
  title =
    fm
      .match(/^title:\s*(.+)$/m)?.[1]
      ?.trim()
      .replace(/^["']|["']$/g, '') || title
  date = fm.match(/^date:\s*(.+)$/m)?.[1]?.trim() || date
  version = fm.match(/^version:\s*(.+)$/m)?.[1]?.trim() || version
  audience = fm.match(/^audience:\s*(.+)$/m)?.[1]?.trim() || ''
}

// Strip front-matter from markdown content (anchored to the very start only)
const md = mdSource.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n)+/, '')

// Derive title / subtitle from front-matter title or first H1
const titleParts = title.split(/\s*[—–]\s*/)
let mainTitle = titleParts[0] || title
subtitle = titleParts[1] || ''
if (!subtitle) {
  const h1Match = md.match(/^#\s+(.+)$/m)
  if (h1Match) {
    const h1Parts = h1Match[1].split(/\s*[—–]\s*/)
    if (h1Parts.length > 1) {
      subtitle = h1Parts[1]
      if (!mainTitle || mainTitle === 'Document') {
        mainTitle = h1Parts[0]
        title = h1Parts[0]
      }
    } else if (!mainTitle || mainTitle === 'Document') {
      mainTitle = h1Match[1].trim()
      title = h1Match[1].trim()
    }
  }
}

// --- Parse Markdown tokens ---
const tokens = marked.lexer(md)

// --- Style constants ---
const FONT = 'Calibri'
const HEADER_COLOR = '1F3864'
const ACCENT_COLOR = '2E75B6'
const TABLE_HEADER_BG = 'D6E4F0'
const TABLE_ALT_BG = 'F2F7FB'
const CODE_BG = 'F5F5F5'
const CODE_FONT = 'Consolas'
const BORDER_COLOR = 'B4C6E7'

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR }
const tableBorders = {
  top: tableBorder,
  bottom: tableBorder,
  left: tableBorder,
  right: tableBorder,
  insideHorizontal: tableBorder,
  insideVertical: tableBorder,
}

// --- Utility: decode HTML entities ---
function decodeEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

// --- Inline tokens to TextRun[] ---
function inlineToRuns(inlineTokens, parentBold = false, parentItalic = false) {
  const runs = []
  if (!inlineTokens) return runs
  for (const t of inlineTokens) {
    switch (t.type) {
      case 'text':
        runs.push(
          new TextRun({
            text: decodeEntities(t.text || t.raw || ''),
            bold: parentBold,
            italics: parentItalic,
            font: FONT,
            size: 22,
          }),
        )
        break
      case 'strong':
        runs.push(...inlineToRuns(t.tokens, true, parentItalic))
        break
      case 'em':
        runs.push(...inlineToRuns(t.tokens, parentBold, true))
        break
      case 'codespan':
        runs.push(
          new TextRun({
            text: t.text,
            font: CODE_FONT,
            size: 20,
            bold: parentBold,
            shading: { type: ShadingType.SOLID, color: CODE_BG, fill: CODE_BG },
          }),
        )
        break
      case 'link':
        runs.push(
          new TextRun({
            text: t.text || t.href,
            bold: parentBold,
            italics: parentItalic,
            font: FONT,
            size: 22,
            color: ACCENT_COLOR,
            underline: {},
          }),
        )
        break
      case 'image':
        // Images handled at paragraph level; skip inline
        break
      case 'br':
        runs.push(new TextRun({ break: 1, font: FONT }))
        break
      case 'html':
        // Raw HTML (e.g. an <a id="..."></a> anchor) has no place in the Word output
        break
      default:
        if (t.raw) {
          runs.push(
            new TextRun({
              text: decodeEntities(t.raw),
              bold: parentBold,
              italics: parentItalic,
              font: FONT,
              size: 22,
            }),
          )
        }
        break
    }
  }
  return runs
}

// --- Heading inline runs ---
// Headings previously used the raw markdown text (token.text), so any inline
// emphasis in a heading ("### Title _(note)_") printed its literal _ and *.
function headingRuns(inlineTokens, size, color, italics = false) {
  const runs = []
  for (const t of inlineTokens || []) {
    switch (t.type) {
      case 'text':
        runs.push(
          new TextRun({
            text: decodeEntities(t.text || t.raw || ''),
            bold: true,
            italics,
            font: FONT,
            color,
            size,
          }),
        )
        break
      case 'strong':
        runs.push(...headingRuns(t.tokens, size, color, italics))
        break
      case 'em':
        runs.push(...headingRuns(t.tokens, size, color, true))
        break
      case 'codespan':
        runs.push(
          new TextRun({
            text: t.text,
            bold: true,
            italics,
            font: CODE_FONT,
            color,
            size,
          }),
        )
        break
      case 'link':
        runs.push(
          new TextRun({
            text: t.text || t.href,
            bold: true,
            italics,
            font: FONT,
            color,
            size,
            underline: {},
          }),
        )
        break
      case 'br':
        runs.push(new TextRun({ break: 1, font: FONT }))
        break
      case 'html':
        break
      default:
        if (t.raw) {
          runs.push(
            new TextRun({
              text: decodeEntities(t.raw),
              bold: true,
              italics,
              font: FONT,
              color,
              size,
            }),
          )
        }
        break
    }
  }
  return runs
}

// --- Paragraph inline runs ---
function paragraphRuns(token) {
  if (token.tokens) return inlineToRuns(token.tokens)
  return [new TextRun({ text: token.text || token.raw || '', font: FONT, size: 22 })]
}

// --- Table builder ---
function buildTable(token) {
  const rows = []
  if (token.header) {
    rows.push(
      new TableRow({
        tableHeader: true,
        children: token.header.map(
          (cell) =>
            new TableCell({
              shading: { type: ShadingType.SOLID, color: TABLE_HEADER_BG, fill: TABLE_HEADER_BG },
              children: [
                new Paragraph({
                  children: inlineToRuns(cell.tokens, true),
                  spacing: { before: 40, after: 40 },
                }),
              ],
            }),
        ),
      }),
    )
  }
  if (token.rows) {
    token.rows.forEach((row, idx) => {
      rows.push(
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                shading:
                  idx % 2 === 1
                    ? { type: ShadingType.SOLID, color: TABLE_ALT_BG, fill: TABLE_ALT_BG }
                    : undefined,
                children: [
                  new Paragraph({
                    children: inlineToRuns(cell.tokens),
                    spacing: { before: 30, after: 30 },
                  }),
                ],
              }),
          ),
        }),
      )
    })
  }
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
  })
}

// --- Code block builder ---
function buildCodeBlock(token) {
  const lines = (token.text || '').split('\n')
  return lines.map(
    (line) =>
      new Paragraph({
        children: [new TextRun({ text: line || ' ', font: CODE_FONT, size: 18 })],
        spacing: { before: 20, after: 20 },
        shading: { type: ShadingType.SOLID, color: CODE_BG, fill: CODE_BG },
        indent: { left: 360 },
      }),
  )
}

// --- List builder ---
function buildList(token, level = 0) {
  const items = []
  const indent = 720 + level * 360
  for (const item of token.items) {
    const bullet = token.ordered ? `${item.raw?.match(/^\d+/)?.[0] || '1'}.` : '\u2022'
    // A list item holds one token per block: a tight item is a single `text`
    // token, while a loose item is `[paragraph, space, paragraph, ...]`. Render
    // EVERY block, not just the first, or the item's body is silently dropped
    // (this previously lost the prayers following a bold label such as
    // "**1 x (Large Bead):**").
    const blocks = (item.tokens || []).filter((t) => t.type !== 'space' && t.type !== 'html')
    const nested = blocks.filter((t) => t.type === 'list')
    let rendered = 0
    for (const block of blocks) {
      if (block.type === 'list') continue
      const runs =
        block.tokens && block.tokens.length
          ? inlineToRuns(block.tokens)
          : [
              new TextRun({
                text: decodeEntities(block.text || block.raw || '').replace(/\*\*/g, ''),
                font: FONT,
                size: 22,
              }),
            ]
      if (!runs.length) continue
      items.push(
        new Paragraph({
          children: [
            new TextRun({ text: rendered === 0 ? `${bullet}  ` : '', font: FONT, size: 22 }),
            ...runs,
          ],
          spacing: { before: 40, after: 40 },
          indent: { left: rendered === 0 ? indent : indent + 360 },
        }),
      )
      rendered++
    }
    if (rendered === 0) {
      items.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${bullet}  `, font: FONT, size: 22 }),
            new TextRun({
              text: decodeEntities(item.text || '').replace(/\*\*/g, ''),
              font: FONT,
              size: 22,
            }),
          ],
          spacing: { before: 40, after: 40 },
          indent: { left: indent },
        }),
      )
    }
    for (const n of nested) items.push(...buildList(n, level + 1))
  }
  return items
}

// --- Build document children ---
const children = []

// Title page (from front-matter metadata)
children.push(
  new Paragraph({ spacing: { before: 2400 } }),
  new Paragraph({
    children: [
      new TextRun({ text: mainTitle, font: FONT, size: 56, bold: true, color: HEADER_COLOR }),
    ],
    alignment: AlignmentType.CENTER,
  }),
)
if (subtitle) {
  children.push(
    new Paragraph({
      children: [new TextRun({ text: subtitle, font: FONT, size: 36, color: ACCENT_COLOR })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  )
}
if (!noMeta) {
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Date: ${date}  |  Version: ${version}`,
          font: FONT,
          size: 22,
          color: '666666',
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
  )
  if (audience) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Audience: ${audience}`, font: FONT, size: 22, color: '666666' }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
      }),
    )
  }
}
children.push(new Paragraph({ children: [new PageBreak()] }))

// Table of Contents (static, built from headings found in the markdown)
// `--no-toc` discards the whole block afterwards by truncating back to here.
const tocStartIndex = children.length
children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: 'Table of Contents',
        font: FONT,
        size: 32,
        bold: true,
        color: HEADER_COLOR,
      }),
    ],
    spacing: { before: 200, after: 400 },
  }),
)

// Pre-scan tokens for headings to build the TOC
// plainText() strips markdown emphasis markers ("**", "_", "`") from a heading
// so that TOC entries read as plain text instead of raw markdown.
const plainText = (inlineTokens) => {
  let out = ''
  for (const t of inlineTokens || []) {
    switch (t.type) {
      case 'text':
      case 'codespan':
        out += decodeEntities(t.text || t.raw || '')
        break
      case 'strong':
      case 'em':
      case 'link':
        out += plainText(t.tokens)
        break
      case 'br':
        out += ' '
        break
      case 'image':
      case 'html':
        break
      default:
        if (t.raw) out += decodeEntities(t.raw)
    }
  }
  return out
}

for (const tok of tokens) {
  if (tok.type !== 'heading' || tok.depth > 3) continue
  // Skip the first H1 title and the TOC heading itself
  if (
    tok.depth === 1 &&
    mainTitle !== 'Document' &&
    decodeEntities(tok.text || '').includes(mainTitle)
  )
    continue
  if (tok.text === 'Table of Contents') continue

  const indent = (tok.depth - 1) * 360
  const tocSize = tok.depth === 1 ? 24 : tok.depth === 2 ? 22 : 20
  const tocBold = tok.depth <= 2
  const tocColor = tok.depth <= 2 ? HEADER_COLOR : ACCENT_COLOR
  const tocText = plainText(tok.tokens) || decodeEntities(tok.text)

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: tocText,
          font: FONT,
          size: tocSize,
          bold: tocBold,
          color: tocColor,
        }),
      ],
      spacing: { before: tok.depth === 2 ? 80 : 40, after: 40 },
      indent: { left: indent },
    }),
  )
}

children.push(new Paragraph({ children: [new PageBreak()] }))
if (noToc) children.length = tocStartIndex

// --- Token walker ---
let skipToc = false

for (const token of tokens) {
  switch (token.type) {
    case 'heading': {
      // Skip first H1 if it matches the front-matter title (already on title page)
      if (
        token.depth === 1 &&
        mainTitle !== 'Document' &&
        decodeEntities(token.text || '').includes(mainTitle)
      ) {
        continue
      }
      // Skip markdown TOC section
      if (token.text === 'Table of Contents') {
        skipToc = true
        continue
      }
      if (skipToc && token.depth > 2) continue
      skipToc = false

      const headingMap = {
        1: HeadingLevel.HEADING_1,
        2: HeadingLevel.HEADING_2,
        3: HeadingLevel.HEADING_3,
        4: HeadingLevel.HEADING_4,
      }
      children.push(
        new Paragraph({
          heading: headingMap[token.depth] || HeadingLevel.HEADING_4,
          children: headingRuns(
            token.tokens || [],
            token.depth === 2 ? 32 : token.depth === 3 ? 26 : 24,
            token.depth <= 2 ? HEADER_COLOR : ACCENT_COLOR,
          ),
          spacing: { before: token.depth === 2 ? 360 : 240, after: 120 },
        }),
      )
      break
    }
    case 'blockquote': {
      for (const inner of token.tokens || []) {
        if (inner.type !== 'paragraph') continue
        children.push(
          new Paragraph({
            children: inlineToRuns(inner.tokens, false, true),
            indent: { left: 360 },
            spacing: { before: 120, after: 120 },
          }),
        )
      }
      break
    }
    case 'paragraph': {
      if (skipToc) continue
      // A paragraph consisting only of images (one or more, e.g. a cover group)
      const inline = token.tokens || []
      const imgTokens = inline.filter((t) => t.type === 'image')
      const onlyImages =
        imgTokens.length > 0 &&
        inline.every(
          (t) =>
            t.type === 'image' ||
            (t.type === 'text' && !String(t.text || '').trim()) ||
            t.type === 'space',
        )
      if (onlyImages) {
        for (const imgToken of imgTokens) {
        const href = imgToken.href || ''
        const imgPath = resolve(inputDir, href)
        if (existsSync(imgPath)) {
          const imgBuf = readFileSync(imgPath)
          const dims = pngDimensions(imgBuf)
          const maxW = 580 // max width in points (~6 inches)
          const scale = dims.width > maxW ? maxW / dims.width : 1
          const w = Math.round(dims.width * scale)
          const h = Math.round(dims.height * scale)
          children.push(
            new Paragraph({
              children: [
                new ImageRun({
                  data: imgBuf,
                  transformation: { width: w, height: h },
                  type: 'png',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 120, after: 40 },
            }),
          )
          // Add caption if alt text exists
          if (imgToken.text) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: imgToken.text,
                    font: FONT,
                    size: 18,
                    italics: true,
                    color: '666666',
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 120 },
              }),
            )
          }
        } else {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `[Image not found: ${href}]`,
                  font: FONT,
                  size: 20,
                  italics: true,
                  color: '888888',
                }),
              ],
              spacing: { before: 80, after: 80 },
            }),
          )
        }
        }
      } else {
        const runs = paragraphRuns(token)
        // Skip a paragraph that renders to nothing (e.g. a bare raw-HTML anchor)
        if (runs.length) {
          children.push(
            new Paragraph({
              children: runs,
              spacing: { before: 80, after: 80 },
            }),
          )
        }
      }
      break
    }
    case 'table':
      if (skipToc) continue
      children.push(buildTable(token))
      children.push(new Paragraph({ spacing: { after: 120 } }))
      break
    case 'code':
      if (skipToc) continue
      if (token.lang === 'mermaid') {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: '[Diagram: See source .md file for interactive Mermaid diagram]',
                font: FONT,
                size: 20,
                italics: true,
                color: '888888',
              }),
            ],
            spacing: { before: 80, after: 80 },
            shading: { type: ShadingType.SOLID, color: CODE_BG, fill: CODE_BG },
            indent: { left: 360 },
          }),
        )
      } else {
        children.push(...buildCodeBlock(token))
      }
      children.push(new Paragraph({ spacing: { after: 80 } }))
      break
    case 'list':
      if (skipToc) continue
      children.push(...buildList(token))
      break
    case 'hr':
      skipToc = false
      children.push(
        new Paragraph({
          spacing: { before: 200, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR } },
        }),
      )
      break
    case 'html':
      // Drop block-level raw HTML (anchors, stray tags) entirely
      break
    case 'space':
      break
    default:
      if (token.raw && !skipToc) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: decodeEntities(token.raw.trim()), font: FONT, size: 22 }),
            ],
            spacing: { before: 80, after: 80 },
          }),
        )
      }
      break
  }
}

// --- Page geometry ---
// Dimensions in twips (1 inch = 1440 twips). The half-* presets are folded
// pamphlet sizes: US Letter folded in half (5.5 x 8.5 in) and A4 folded in
// half (A5, 148 x 210 mm). Without --size the library default page is kept.
const PAGE_SIZES = {
  letter: { width: 12240, height: 15840 },
  a4: { width: 11906, height: 16838 },
  'half-letter': { width: 7920, height: 12240 },
  'half-a4': { width: 8391, height: 11906 },
}
let pageSize
if (flags.size !== undefined) {
  pageSize = PAGE_SIZES[flags.size]
  if (!pageSize) {
    console.error(`Unknown --size "${flags.size}". Use: ${Object.keys(PAGE_SIZES).join(', ')}`)
    process.exit(1)
  }
}
const marginTwips = flags.margin === undefined ? 1440 : Number(flags.margin)
if (!Number.isFinite(marginTwips) || marginTwips < 0) {
  console.error('--margin must be a non-negative number of twips (1440 = 1 inch)')
  process.exit(1)
}

// --- Create and write document ---
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
      heading1: {
        run: { font: FONT, size: 36, bold: true, color: HEADER_COLOR },
        paragraph: { spacing: { before: 360, after: 160 } },
      },
      heading2: {
        run: { font: FONT, size: 32, bold: true, color: HEADER_COLOR },
        paragraph: { spacing: { before: 320, after: 120 } },
      },
      heading3: {
        run: { font: FONT, size: 26, bold: true, color: ACCENT_COLOR },
        paragraph: { spacing: { before: 240, after: 100 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          ...(pageSize ? { size: pageSize } : {}),
          margin: {
            top: marginTwips,
            bottom: marginTwips,
            left: marginTwips,
            right: marginTwips,
          },
        },
      },
      children,
    },
  ],
  features: { updateFields: false },
})

const buffer = await Packer.toBuffer(doc)
writeFileSync(outputPath, buffer)
console.log(`Generated: ${outputPath} (${(buffer.length / 1024).toFixed(0)} KB)`)
