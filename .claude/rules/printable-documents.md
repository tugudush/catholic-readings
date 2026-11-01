---
name: 'Printable & Word Documents'
description: 'Use when asked to create a printable document, print-ready version, Word document, .docx, handout, or booklet from any document in this repository — especially a Markdown file. Enforces that every print artifact goes in the for-printing/ directory, inside the subdirectory matching its topic, that each .docx is paired with the Markdown it was generated from, that a print artifact carries no links (a reader holding paper cannot follow them), that every page is filled rather than padded with white space, and that print artifacts are built at the pamphlets condensed 10 pt type scale.'
paths:
  - 'for-printing/**/*.md'
---

# Printable & Word Documents

Every print artifact — a Word (`.docx`) file together with the Markdown it was generated from — goes
under `for-printing/` at the repository root. The topical directories
([liturgy/](../../liturgy/), [saints/](../../saints/),
[book-of-truth/](../../book-of-truth/), …) hold the study documents; they never hold a `.docx`.

This file governs **where the result goes and what may appear on the page** — no links, no half-empty
pages. The mechanics of the build live in the md-to-docx skill at
[.claude/skills/md-to-docx/SKILL.md](../../.claude/skills/md-to-docx/SKILL.md).

## 1. Placement

| Source document                                                  | Print artifact                                                                         |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `book-of-truth/crusade-prayers/selected-prayers.md`              | `for-printing/crusade-prayers/selected-prayers.md` + `selected-prayers.docx`           |
| `book-of-truth/crusade-prayers/crusade-prayers-7-days/monday.md` | `for-printing/crusade-prayers/crusade-prayers-7-days/monday/monday.md` + `monday.docx` |
| `liturgy/chaplet-divine-mercy.md`                                | `for-printing/divine-mercy/how-to-pray-the-chaplet-of-divine-mercy.md` + `.docx`       |

- **Mirror the source path** under `for-printing/`, dropping the repository prefix:
  `book-of-truth/crusade-prayers/` → `for-printing/crusade-prayers/`.
- **Create a topic folder** when the topic has none yet: `for-printing/<topic-slug>/`, lowercase
  kebab-case singular topic name (`rosary/`, `divine-mercy/`, `liturgy-of-the-hours/`).
- **Keep the source basename** for both files. When the print edition has its own clearer title,
  give the `.md` and the `.docx` the same new basename so the pair matches.
- **Multi-file sets** keep their own subfolder and produce one `.md` + `.docx` pair per source
  document. `for-printing/crusade-prayers/crusade-prayers-7-days/` gives **each day its own folder**
  (`sunday/`, `monday/`, … `saturday/`), with the shared `readme.docx` and `common-prayers.docx`
  left at the top of the set.
- **Pair every `.docx` with the Markdown it was generated from**, so each print folder is
  self-contained. Copy the source `.md` into the print folder alongside the `.docx`, then strip its
  links (§2) — the copy, not the topical source, is what prints.
- Never place a print artifact at the repository root, inside a topical directory, or in
  `private-assets/` / `private-confessions/` (those are private and git-ignored).

## 2. No links on paper

A printed page cannot be clicked, and the reader has never seen this repository. A Markdown link in
a print artifact therefore prints as its link text — usually a bare filename such as
`common-prayers.md` — which tells the paper reader nothing and reads as a defect. The md-to-docx
converter writes link text only; it never emits a hyperlink.

- **Never put a Markdown link, a bare `.md` filename, or a repository path into a print artifact** —
  not in the body, not in a "see also" line, not in the closing note.
- **Omit the reference, or say it in words.** Instead of "the full texts are in
  [common-prayers.md](…)", write "the full texts are in the common prayers" — or drop the sentence.
- **Print the substance instead of pointing at it.** If the reader needs a text, print the text. If
  it cannot fit, say that it belongs to the fuller edition, without naming a file.
- **Name documents by their human title**, never by their filename: _Crusade of Prayers — 7 days_
  (CrusadePrayerGroup.org edition), not `crusade-prayers-7-days.md`.
- **Do not "retarget" a link** to the print folder's own depth. `../../` still lands on a file the
  reader does not have.
- **A web address is the one exception**, and only when the user asks for one: a URL the reader can
  type is useful, a repository-relative path is not.
- The rule applies to the **`for-printing/` copy**, which is the build input. Keep the links in the
  topical source document; strip them when the Markdown is copied into the print folder.

## 3. Conserve space

Every page is paper the reader holds. A page that stops a third of the way down, a heading stranded
at the foot with its text overleaf, or a trailing page carrying two lines is a defect — not
breathing room. This applies to a full-page `.docx` exactly as it does to a folded pamphlet.

- **Strip the source's furniture before building**: the generated table of contents and its page
  break, a date/version line nobody asked for, `---` section rules, `##` headings used as labels,
  multi-sentence provenance notes, trailing blank lines, stray `<!-- pagebreak -->` markers.
- **Budget the pages before writing, then measure — never eyeball.** Build, export the PDF, and read
  the foot of every page back out of it.
- **Fill or trim; never squeeze.** Cut or add content to fill the last page. Do not shrink the type,
  the margins or the line spacing to force a page count — the type scale is fixed before the build
  (next bullet), not used as a lever afterwards.
- **Build every print artifact at the pamphlets' condensed type scale**: `--font-size=10`. The flag
  scales headings, lists, tables, code blocks and captions by the same factor, not just the body
  text, so a full-page document stays optically consistent while fitting about a tenth more on each
  page. 10 pt is the setting for a pamphlet **and** a full page; below it the fixed block spacing
  dominates and nothing is gained.
- **Keep a heading with its text.** A heading in the last two lines of a page, with its text
  overleaf, reads as a mistake. The converter sets no keep-with-next, so shorten the material before
  it and let the heading move down whole.
- **A trailing blank page is always wrong** — content was trimmed after the last budget, or a
  `pagebreak` marker was left behind.
- **The first page is the converter's title page and the last page is the tail**; judge the pages in
  between, and fill the tail rather than leaving it half empty.

The mechanics live in the skills: [md-to-docx](../skills/md-to-docx/SKILL.md) § Conserve Space for a
full-page document, [create-pamphlet](../skills/create-pamphlet/SKILL.md) §3 for a folded booklet.

## 4. Boundaries

- Do **not** edit the topical source just to make the print file render better. If the source
  genuinely has a defect, fix it in its own right and say so.
- Do **not** backfill source Markdown into print folders that predate the pairing rule above
  unless the user asks.
- Do **not** update the [AGENTS.md](../../AGENTS.md) directory map or the
  [README.md](../../README.md) portal unless the user asks for it.
- Leave the new files **uncommitted** in the working tree.
