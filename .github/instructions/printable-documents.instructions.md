---
name: 'Printable & Word Documents'
description: 'Use when asked to create a printable document, print-ready version, Word document, .docx, handout, or booklet from any document in this repository — especially a Markdown file. Enforces that every print artifact goes in the for-printing/ directory, inside the subdirectory matching its topic, and that each .docx is paired with the Markdown it was generated from.'
applyTo: 'for-printing/**/*.md'
---

# Printable & Word Documents

Every print artifact — a Word (`.docx`) file together with the Markdown it was generated from — goes
under `for-printing/` at the repository root. The topical directories
([liturgy/](../../liturgy/), [saints/](../../saints/),
[book-of-truth/](../../book-of-truth/), …) hold the study documents; they never hold a `.docx`.

This file governs **where the result goes**. The build procedure itself lives in the md-to-docx
skill at [.agents/skills/md-to-docx/SKILL.md](../../.agents/skills/md-to-docx/SKILL.md).

## 1. Placement

| Source document                                                  | Print artifact                                                                   |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `book-of-truth/crusade-prayers/selected-prayers.md`              | `for-printing/crusade-prayers/selected-prayers.md` + `selected-prayers.docx`     |
| `book-of-truth/crusade-prayers/crusade-prayers-7-days/monday.md` | `for-printing/crusade-prayers/crusade-prayers-7-days/monday.md` + `monday.docx`  |
| `liturgy/chaplet-divine-mercy.md`                                | `for-printing/divine-mercy/how-to-pray-the-chaplet-of-divine-mercy.md` + `.docx` |

- **Mirror the source path** under `for-printing/`, dropping the repository prefix:
  `book-of-truth/crusade-prayers/` → `for-printing/crusade-prayers/`.
- **Create a topic folder** when the topic has none yet: `for-printing/<topic-slug>/`, lowercase
  kebab-case singular topic name (`rosary/`, `divine-mercy/`, `liturgy-of-the-hours/`).
- **Keep the source basename** for both files. When the print edition has its own clearer title,
  give the `.md` and the `.docx` the same new basename so the pair matches.
- **Multi-file sets** keep their own subfolder and produce one `.md` + `.docx` pair per source
  document — `for-printing/crusade-prayers/crusade-prayers-7-days/` holds `readme`, `common-prayers`,
  and the seven day files.
- **Pair every `.docx` with the Markdown it was generated from**, so each print folder is
  self-contained. Copy the source `.md` into the print folder alongside the `.docx`.
- Never place a print artifact at the repository root, inside a topical directory, or in
  `private-assets/` / `private-confessions/` (those are private and git-ignored).

## 2. Boundaries

- Do **not** edit the topical source just to make the print file render better. If the source
  genuinely has a defect, fix it in its own right and say so.
- Do **not** backfill source Markdown into print folders that predate the pairing rule above
  unless the user asks.
- Do **not** update the [AGENTS.md](../../AGENTS.md) directory map or the
  [README.md](../../README.md) portal unless the user asks for it.
- Leave the new files **uncommitted** in the working tree.
