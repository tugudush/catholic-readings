---
description: Convert Markdown files to professionally formatted Word (.docx) documents with embedded PNG images — pure JavaScript, no external tools required
metadata:
  github-path: skills/md-to-docx
  github-ref: refs/heads/main
  github-repo: https://github.com/github/awesome-copilot
  github-tree-sha: e72aa6749f03b6c26a88c2cd2a912518111e0fb5
name: md-to-docx
---

# Markdown to Word (.docx) Skill

Convert Markdown (`.md`) files into professionally formatted Word (`.docx`) documents with embedded PNG images. Uses **pure JavaScript** via the `docx` and `marked` npm packages — no Pandoc, LibreOffice, or any native binary required.

## How to Convert

```bash
# Install dependencies (one-time, from the scripts folder)
cd skills/md-to-docx/scripts && npm install

# Convert (run from workspace root)
node skills/md-to-docx/scripts/md-to-docx.mjs <input.md> [output.docx]
```

If `output.docx` is omitted, it defaults to `<input-basename>.docx` in the current directory.

### Options

Long flags (`--name` or `--name=value`) may appear anywhere on the command line:

| Flag | Effect |
| --- | --- |
| `--size=letter\|a4\|half-letter\|half-a4` | page size; the `half-*` presets are folded pamphlet sizes (A5 = `half-a4`) |
| `--margin=<twips>` | page margin in twips (1440 = 1 in); `720` is the 12.7 mm pamphlet margin |
| `--font-size=<pt>` | body type size in points (default 11). Every heading, list, table, image-caption and code size scales by the same factor, so `--font-size=10` shrinks the whole document by about a tenth. **Print artifacts in this repository — pamphlets and full-page documents alike — are built at `--font-size=10`** (see [printable-documents.md](../../rules/printable-documents.md) §3) |
| `--no-toc` | drop the generated table of contents and its page break |
| `--no-meta` | drop the "Date / Version / Audience" line from the title page |

## Skill Folder Contents

| File                     | Purpose                            |
| ------------------------ | ---------------------------------- |
| `SKILL.md`               | This instruction file              |
| `scripts/md-to-docx.mjs` | Node.js Markdown-to-Word converter |
| `scripts/package.json`   | Dependencies (`docx`, `marked`)    |

## Prerequisites

| Requirement  | Version | Notes                           |
| ------------ | ------- | ------------------------------- |
| **Node.js**  | 18+     | Required runtime                |
| **`docx`**   | 9+      | Pure JS Word document generator |
| **`marked`** | 15+     | Markdown parser                 |

No native binaries. No system-level installs. Works on Windows, macOS, and Linux.

## Features

The converter:

- **Extracts YAML front-matter** — uses `title`, `date`, `version`, `audience` for the title page
- **Generates a title page** — with project name, subtitle, date, version, and audience
- **Generates a table of contents** — built from H1-H3 headings
- **Embeds PNG images** — resolves `![alt](path)` references relative to the input `.md` file, reads the PNG, and embeds it inline in the Word document
- **Styled output** — Calibri font, colored headings (`#1F3864`), styled tables with alternating row colors, code blocks in Consolas
- **Handles all Markdown elements** — headings, paragraphs, tables, code blocks, lists, images, links, horizontal rules
- **Links are flattened to their text** — `[common-prayers.md](path)` prints as the words `common-prayers.md`. No hyperlink is written into the `.docx`, so a repository link is a dead filename on the page: strip links from anything meant for print (see [printable-documents.md](../../rules/printable-documents.md) §2)

## Conserve Space

A page is paper the reader holds, so a full-page document gets the same treatment as a pamphlet:
fill the pages, and delete whatever exists only to take up room.

**Strip the source's furniture before building:**

| Space-eater | What to do |
| --- | --- |
| the generated table of contents and its page break | pass `--no-toc` unless the document is long enough to need one |
| the title-page "Date / Version / Audience" line | pass `--no-meta` unless those facts matter to the reader |
| `---` section rules | delete them; numbered headings already separate the sections |
| a `##` heading used as a label inside one section | use a bold lead-in (`**Latin.**`, `**B.**`) instead |
| multi-sentence provenance or editorial notes | one sentence per item; the rest belongs in a closing note |
| trailing blank lines, stray `<!-- pagebreak -->` markers | never leave them in — each can add a blank page |

**Then budget and measure — do not eyeball.** A4 at 11 pt with the 1 in default margin holds about
fifty lines of body text; estimate against that before writing, then build and read the foot of every
page back out of the exported PDF:

```bash
python .claude/skills/create-pamphlet/scripts/export-pdf.py <docx> /tmp/doc.pdf
python -c "import pymupdf;d=pymupdf.open('/tmp/doc.pdf');[print(p.number+1,'blank pt:',round(p.rect.height-72-max([b[3] for b in p.get_text('blocks') if b[4].strip()],default=0))) for p in d]"
```

Change the `72` to your bottom margin in points.

- **A final page holding only a line or two is a defect** — trim until the document closes on the
  previous page, or add content that belongs there. Never leave a blank trailing page.
- **A heading in the last two lines of a page, with its text overleaf, reads as a mistake.** Shorten
  the material before it so the heading moves to the next page whole; the converter sets no
  keep-with-next.
- **Fill or trim; never squeeze.** Do not shrink the type, the margins or the line spacing to reach a
  page count — the type scale is fixed before the build (below), not used as a lever afterwards.
- **More than about a third of a page left white at the foot** (on any page but the last) means the
  content was never budgeted.

**Type scale.** Every print artifact — pamphlet or full page — is built at the same condensed 10 pt
scale, set once at the start of the build:

```bash
node .claude/skills/md-to-docx/scripts/md-to-docx.mjs <input.md> <output.docx> --font-size=10
```

The converter scales headings, lists, tables, code blocks and image captions by the same factor
(`10/11`), so the page keeps its proportions rather than ending up with 11 pt text under 10 pt
headings. Below 10 pt the fixed twip block spacing and Word's page granularity dominate — 9 pt can
give the same page count as 10 pt — so 10 pt is the floor, and content is the lever.

The placement and no-links rules are in [printable-documents.md](../../rules/printable-documents.md).

## Image Embedding

The converter automatically embeds PNG images referenced in the Markdown:

```markdown
![High-Level Architecture](diagrams/high-level-architecture.drawio.png)
```

The image path is resolved **relative to the input Markdown file**. The PNG is read, dimensions are extracted from the PNG header, and the image is scaled to fit within 6 inches width while preserving aspect ratio.

If an image file is not found, a placeholder `[Image not found: <path>]` is inserted.

## Front-Matter Format

```yaml
---
title: Project Name — Project Summary
date: 2025-01-15
version: 1.0
audience: Engineering Team, Architects, Stakeholders
---
```

The title is split on `—` or `–` into main title and subtitle for the title page.
