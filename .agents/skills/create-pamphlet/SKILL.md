---
name: create-pamphlet
description: 'Turn a Markdown document from this repository into a folded, print-ready pamphlet: condensed Markdown plus paired .docx at the folded page size, plus an imposed A4 PDF whose sheets are already in saddle-stitch order. Use when asked to make a pamphlet, booklet, tract, folded handout, or half-fold print edition from an existing document; also use when a Word book-fold print job comes out in the wrong page order, or when a print artifact needs A5/half-letter pages with no table of contents.'
argument-hint: 'Document to turn into a pamphlet (path or topic)'
---

# Create a Folded Pamphlet

Produces one finished print edition from a study document: a condensed **Markdown**, a paired
**.docx** set to the folded page size, and an **imposed PDF** whose A4 sheets are already in
saddle-stitch order — so printing it needs no imposition feature and cannot come out in the wrong order.

All three artifacts are always produced, even when the request only mentions a "printable version" or
a `.docx`: the imposed PDF is the one that prints correctly, and it costs seconds.

## When to Use

- "make a pamphlet / booklet / tract / folded handout from <document>"
- trimming a long study document down to its prayers or its core text for a folded edition
- a Word "Book fold" job whose preview or printed pages come out as 1 | 2 instead of 8 | 1

## 1. Pick the trim size

| Sheet | Folded panels | Use |
| --- | --- | --- |
| A4 210 × 297 mm, folded in half | **A5 — 148 × 210 mm** | **default** — build this unless the user names Letter |
| US Letter 8.5 × 11 in, folded in half | 5.5 × 8.5 in | US |

Half-folding an A-series sheet always yields the next size down (ISO 216: same 1:√2 ratio, half the
area), so "half-fold A4" *is* A5. A5 is **not** the same as half-letter, and Letter has no ISO
counterpart.

## 2. Condense the source

**Cut** — the auto-generated table of contents, the title-page date/version line, the long
biographical essay, data tables (born/died/patronage), the "note on this print edition" essay, and
prose that only makes sense in the full document.

**Keep** — every prayer or core text in a 4-space indented block (one line per line, per
`prayer-formatting.instructions.md`), one sentence of manuscript or occasion per item, and a short
**"A Note on These Texts"** that still distinguishes what is the subject's own from later devotional
composition, private revelation, or editorial inference. The repository's doctrinal-grading convention
is not optional in a pamphlet — it is the reason a devotional text can be distributed safely.

**Retarget links.** A pamphlet in `for-printing/<topic>/` sits two levels below the repository root,
so topic links become `../../<topic>/<file>.md`; links to a sibling print file stay flat.

## 3. Place and name

```
for-printing/<topic>/<name>-pamphlet.md        ← source, hand-editable
for-printing/<topic>/<name>-pamphlet.docx      ← built
for-printing/<topic>/<name>-pamphlet-imposed.pdf ← printable
```

Follows `printable-documents.instructions.md`: print artifacts live only under `for-printing/`, every
`.docx` is paired with the Markdown it came from, and the AGENTS.md map / README portal are left alone
unless asked.

## 4. Write the Markdown, normalize, format

`create_file` emits CRLF on Windows and the repository requires LF. Rewrite with Node using
`String.fromCharCode(13,10)` (never type escape sequences — the memory/tool layer mangles them), then
`npx prettier --write <file>`.

## 5. Build the .docx

```bash
node .agents/skills/md-to-docx/scripts/md-to-docx.mjs \
  for-printing/<topic>/<name>-pamphlet.md \
  for-printing/<topic>/<name>-pamphlet.docx \
  --size=half-a4 --margin=720 --no-toc --no-meta
```

| Flag | Meaning |
| --- | --- |
| `--size=half-a4` | A5 pages on an A4 sheet (`half-letter`, `letter`, `a4` also available) |
| `--margin=720` | 12.7 mm / 0.5 in — twips, 1440 = 1 in |
| `--no-toc` | drops the generated table of contents and its page break |
| `--no-meta` | drops the title-page "Date / Version / Audience" line |

## 6. Verify the .docx before going further

Read the package, never trust the console:

```bash
python -c "import zipfile,re,html;z=zipfile.ZipFile('<docx>');d=z.read('word/document.xml').decode('utf8');print(z.testzip(),re.findall(r'<w:pgSz[^>]*/>',d),'toc','Table of Contents' in d,'meta','Version: 1.0' in d,'draw','<w:drawing' in d)"
```

Expect `None`, an A5 `<w:pgSz>` (8391 × 11906 twips), `toc False`, `meta False`, plus every prayer
string present when the text is stripped of tags.

## 7. The page count must be a multiple of four

A saddle-stitched booklet is printed in multiples of 4 pages (a title page counts as one). Word's own
count comes out of `scripts/export-pdf.py`. If the count is not a multiple of 4, **trim content**
(preferred) or pad with blanks (`impose.py --pad`) — never squeeze the type to force it.

## 8. Export the PDF, then impose

This step is never optional: build the imposed PDF even when only a `.docx` was asked for.

```bash
python .agents/skills/create-pamphlet/scripts/export-pdf.py <docx> /tmp/<name>.pdf
python .agents/skills/create-pamphlet/scripts/impose.py /tmp/<name>.pdf for-printing/<topic>/<name>-pamphlet-imposed.pdf
```

`export-pdf.py` drives the installed Word through COM (pywin32), prints Word's own page size,
book-fold flag and page count, and exports the **logical** pages — Word's PDF export never imposes.

`impose.py` lays those pages two-up on A4 landscape sheets in saddle-stitch order, with faint fold
ticks at the centre of each sheet. For `n` pages and sheet `i` (1 = outermost) the order is
`front = (n − 2(i−1), 2i − 1)` and `back = (2i, n − 2i + 1)`.

**Then look at it.** Render every side and view it before reporting success:

```bash
python -c "import pymupdf;d=pymupdf.open('<imposed.pdf>');[d[i].get_pixmap(dpi=90).save(f'side{i+1}.png') for i in range(d.page_count)]"
```

The cover must be the **right-hand** panel of side 1, with the last page on the left.

## 9. Hand over a print brief

- A4 paper, **1 page per sheet** (never "2 pages per sheet" — it stacks the imposition), scale
  **Default / 100 %** (never "fit to printable area": it shrinks the panels and drifts the fold line).
- Two-sided with **flip on short edge**, or two passes: print `1`, turn the sheet over sideways keeping
  the top edge up, print `2`.
- Sheet 1 wraps the booklet, sheet 2 nests inside; crease on the fold ticks; staple twice through the
  crease, about 40 mm from each end, using an opened stapler over a magazine.
- Tell the user to test one sheet before running the rest.

## Pitfalls

| Symptom | Cause / fix |
| --- | --- |
| Word's print preview shows pages 1 \| 2 | The preview renders logical pages; it is not the imposition. The imposed PDF removes the doubt. |
| "Book fold" seems missing from the file | Word stores it as `<w:bookFoldPrinting/>` in `word/settings.xml`, not in `sectPr`. Check the right part before believing it is unset. |
| Cover illustration or hand formatting disappears | A Word-edited `.docx` is the master copy — never rebuild it from the Markdown. Patch the package instead, or re-impose from the existing PDF. |
| Printed sheets will not fold correctly | Page count is not a multiple of 4, or the second side was flipped about the other axis (the text then prints upside down — a visible, not silent, failure). |
| `docProps/app.xml` reports a silly page count | Word's cached statistic goes stale (it can read "1 page"). Use `export-pdf.py` for the real count. |

## Resources

- [export-pdf.py](./scripts/export-pdf.py) — Word COM export (Windows, `pywin32`)
- [impose.py](./scripts/impose.py) — saddle-stitch imposition (`pymupdf`)
- [md-to-docx skill](../md-to-docx/SKILL.md) — the Markdown → .docx converter this builds on
