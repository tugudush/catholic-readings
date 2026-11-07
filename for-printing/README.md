# Print Settings

Every pamphlet in this directory exists in one or both of two forms. They are printed **differently**, and mixing the two sets of settings is the usual reason a booklet comes out of the printer in the wrong order.

| Artifact                               | What it already is                                                                | Print it with                                          |
| -------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `<name>-pamphlet-imposed.pdf`          | A4 **landscape sheets already in saddle-stitch order** (2 logical pages per side) | Plain A4, one page per sheet, 100 %, duplex short edge |
| `<name>-pamphlet-imposed-enhanced.pdf` | The same duplex-ready imposition, using the name for future pamphlets             | The same settings as the existing imposed PDF          |
| `<name>-pamphlet.docx`                 | The **un-imposed** A5 pages in reading order — Word pairs them at print time      | Word **Book fold**, A4 paper, duplex short edge        |

**Prefer the imposed PDF.** Its page pairs are fixed in the file, though the sheets can still come out in the wrong order or orientation if reloaded incorrectly. The `.docx` is for editing and for printers where Word's book-fold driver works reliably.

**The short version.** Both routes end in the identical object — A4 sheets that fold once and are stapled in the crease. The only thing that differs is who pairs the pages:

- **PDF:** already paired. Test the duplex settings and reload, then print, fold, and staple.
- **DOCX:** Word pairs them while printing (Book fold + duplex). Confirm with **one test sheet**, then run the rest.

The `.docx` has two extra things to watch that the PDF has already handled: the page count must be a multiple of 4 (Word pads a blank panel), and the sheet carries no fold ticks — the imposed PDF prints them at the centre line.

---

## A. Imposed pamphlet PDF (`*-pamphlet-imposed.pdf` or `*-pamphlet-imposed-enhanced.pdf`)

The imposition is already done. Every printer setting that imposes again must be **off**.

| Setting (print dialog) | Value                                        | Why                                                                                                              |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Paper size             | **A4**                                       | Each sheet is one A4 landscape page                                                                              |
| Page size / scaling    | **Actual size / 100 %**                      | "Fit", "Shrink oversized pages" and "Fit to printable area" shrink the panels and drift the fold line off centre |
| Pages per sheet        | **1**                                        | "2 pages per sheet" or "4-up" stacks a second imposition on top of the first                                     |
| Booklet / Book fold    | **Off**                                      | The saddle-stitch order is in the file                                                                           |
| Two-sided              | **Print on both sides — flip on short edge** | Short edge keeps the back panel upright when the sheet is folded                                                 |
| Orientation            | **Landscape** in the app and printer driver  | Matches the imposed A4 sheet                                                                                     |
| Auto-rotate and centre | On (printer default)                         | Lets the landscape sheet land correctly                                                                          |
| Copies                 | **1 sheet first**                            | Always test the outer sheet before running the batch                                                             |

**Manual duplex — one job.** On the Epson L5390 in Chrome, open **More settings → Print using system dialog → More settings → Printing preferences**. Under **2-Sided Printing**, select **Manual (Short-edge binding)** and uncheck **Reverse Order**. Print all PDF pages as one job; the driver prints the fronts, then prompts you to reload the stack for the backs. Do not select odd and even pages separately when the driver manages both passes.

Test PDF pages **1–2** on one sheet first. Follow the driver's reload diagram: the rear feeder takes the printable side face-up, so the blank side must face up for the second pass. Flip the stack over; do not add a 180° rotation unless the driver directs it. Check that the back is upright, the cover is on the outside right, and the folded pages are in order. Discard the test sheet or exclude its two PDF pages from the remaining job so it is not printed twice. Manual duplex still requires a reload; it is not automatic two-sided printing.

**Manual fallback — sheet by sheet.** If the driver cannot manage duplex, print one A4 side at a time. Each PDF page _is_ one complete sheet side. An 8-page booklet is 4 PDF sides on 2 sheets:

| Print | PDF page | Carries            | Becomes                |
| ----- | -------- | ------------------ | ---------------------- |
| 1st   | 1        | last page \| cover | sheet 1, front (outer) |
| 2nd   | 2        | page 2 \| page 7   | sheet 1, back          |
| 3rd   | 3        | page 6 \| page 3   | sheet 2, front (inner) |
| 4th   | 4        | page 4 \| page 5   | sheet 2, back          |

1. Load **one** A4 sheet. Print **page 1** (Print → Pages: `1`).
2. Flip the sheet over and reload it with the blank side facing the printable side of the feeder. Use a test sheet to establish the correct feed direction for this printer and application.
3. Reload that same sheet and print **page 2**. Sheet 1 is done; folded, the cover sits on the right-hand panel.
4. **New sheet** → print **page 3** → flip the same way → print **page 4**. Sheet 2 nests inside sheet 1.
5. Longer booklets carry on two PDF pages per sheet — the 12-page `daily-crusade-prayers` is 6 sides = 3 sheets.

**Separate front and back passes** are another fallback: print pages 1, 3, 5 …, then 2, 4, 6 … Stack order and orientation depend on the printer and print settings; test before running a batch. Do not use this method in addition to the driver's manual-duplex option.

**Finishing.** Sheet 1 is the outer wrapper — the cover (page 1) must sit on the **right-hand panel**, with the last page on the left. Nest sheet 2 inside sheet 1, and so on; crease on the fold ticks printed at the centre of each sheet; staple twice through the crease about 40 mm from each end, using an opened stapler over a magazine.

**That is the whole job:** print it, fold the sheets, staple twice in the fold. Nothing needs imposing — the file already did it.

---

## B. Book-style pamphlet DOCX (`*-pamphlet.docx`)

The `.docx` is the **same booklet, not yet imposed**: page 1, page 2, page 3 … as separate A5 pages in reading order. Printed as it stands, each A5 page goes to its own A4 sheet — eight half-blank sheets instead of two double-sided ones. **Word** has to do the pairing while printing, which is the only reason this route has more settings than route A.

**If the tray holds real A5 paper, none of this section applies** — skip to [section C](#c-real-a5-paper--the-docx-without-any-folding), which needs no imposition at all.

So the finish is identical to route A: **fold the sheets and staple twice in the crease.** The single difference is who does the page ordering — the PDF already carries it, Word works it out on the way to the printer.

**No A5 paper and no cutting are needed.** Book fold puts the two A5 pages **side by side on one A4 sheet**, exactly as the imposed PDF has them, so the sheet folds and staples the same way. What goes wrong is skipping step 1, or using the driver's plain "2 pages per sheet" instead: that pairs page 1 with page 2, page 3 with page 4, and _that_ is the version which folds into the wrong order.

**Step 1 — tell Word to fold** (Layout → Margins → Custom Margins):

| Setting            | Value                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Multiple pages     | **Book fold**                                                                               |
| Sheets per booklet | **All**                                                                                     |
| Gutter             | **0** (the 12.7 mm / 0.5 in margins are already set)                                        |
| Page size          | A5, 148 × 210 mm — the **document** page, not the paper (already set in the pamphlet files) |

Word then switches the sheet to A4 landscape and imposes the pages itself. The setting is stored in the file, so this is done once per pamphlet — but most pamphlets here do not carry it yet (see the check below).

**Step 2 — print it:**

| Setting          | Value                                        |
| ---------------- | -------------------------------------------- |
| Paper size       | **A4**                                       |
| Two-sided        | **Print on both sides — flip on short edge** |
| Scaling          | **None / 100 %**, "Scale to paper size" off  |
| Pages per sheet  | **1** — Book fold supplies the pairing       |
| Layout / Booklet | Do not enable a second booklet mode          |

**Step 3 — no duplex unit? Use manual duplex.** Choose **Manual duplex** in Word or the printer driver, not both. Follow the displayed reload instructions and test one sheet: the required orientation can depend on the application and driver. Word has already chosen which pages belong together, so you never handle a page number.

Unlike route A, you **cannot** do "print page 1, flip, print page 2" here. With Book fold the Pages box counts the booklet's logical pages (1–8), not sheet sides, and the imposition happens between that box and the paper — asking for a single page does not give you a sheet side. The booklet has to go through as one job.

If the printer driver itself offers a **Booklet** / **Booklet layout** option (many HP, Canon and Brother drivers do), that can do the pairing and the reload prompts instead of Word's Book fold — use one or the other, never both.

**Paper is always A4 — never load A5.** A5 (148 × 210 mm) is the _page_ size inside the file, i.e. one folded panel; Book fold pairs two A5 pages on each side of an A4 sheet (A4 landscape, 297 × 210 mm). Selecting A5 paper in the tray would give a stack of separate unfolded A5 pages instead of a folded booklet — if that is what you want, see section C.

Word's own preview may still show page 1 beside page 2 — it renders the reading order, not the imposition, so that is **not** a sign of failure. Confirm with a single sheet instead: two A5 panels on one landscape A4, the cover on the right-hand panel and the last page on the left. Then fold and staple exactly as in route A.

Only `saints/prayers-of-st-francis-of-assisi-pamphlet.docx` currently has Book fold stored; every other pamphlet needs step 1 once. Check before printing:

```bash
python -c "import zipfile,re;z=zipfile.ZipFile('<name>-pamphlet.docx');s=z.read('word/settings.xml') if 'word/settings.xml' in z.namelist() else '';print('bookFold','<w:bookFoldPrinting' in s.decode());print(re.findall(r'<w:pgSz[^>]*/>',z.read('word/document.xml').decode())[0])"
```

Expect `bookFold True` and an A5 landscape or A5 portrait `<w:pgSz>` for a print-only copy. If it reports `False`, set Book fold manually.

**Page count.** A folded booklet is always a multiple of 4 pages. Word pads the last sheet with blanks if the text is short; that blank panel is normal for the `.docx` route, which is another reason the imposed PDF — trimmed to fill its pages — prints better.

---

## C. Real A5 paper — the `.docx` without any folding

The `.docx` pages are **already A5**, so if the tray actually holds A5 sheets there is nothing to impose: one page prints on one sheet, in reading order. None of the Book fold settings apply — clear them first if the file carries them.

| Setting (print dialog) | Value                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| Paper size             | **A5** — in the driver and, if it is a separate field, in Word too |
| Book fold              | **Off** — Layout → Margins → **Normal**, gutter 0                  |
| Pages per sheet        | **1**                                                              |
| Scaling                | **100 % / actual size**, no "scale to A5"                          |
| Two-sided              | **Manual duplex** (or **flip on long edge** if automatic)          |

**Printing both sides.** Word numbers the pages 1–8; with A5 paper each number is one sheet side. Choose **Manual duplex** and let Word run the two passes — it prints all fronts, tells you to reload, then prints the backs in the matching order. Follow the displayed reload instructions and test one sheet; A5 portrait uses a different binding edge from the landscape imposed PDF. If the driver has no manual duplex, print pages `1,3,5,7`, reload, then `2,4,6,8`, and use the pencil-arrow test in the printer section to fix the stack direction once.

**Binding it.** You get 8 A5 sheets, pages 1–8 in order, so it is bound, not folded: staple twice down the **left edge** (long-arm or saddle stapler), or corner-staple the top-left. Folding this stack in half would give A6 panels in the wrong order.

Two things to be clear about:

- **It is no longer a folded pamphlet.** The A5 panel was designed to be half of an A4 sheet; printed on A5 paper it is simply a small booklet — fine as a handout, but not the fold-in-half object.
- **It uses twice the ink and paper sides.** The folded version prints 4 sides on 2 A4 sheets; this prints 8 sides on 8 A5 sheets, for the same total area.

The **imposed PDF cannot be used this way** — its pages are A4 landscape with two panels already on them, so A5 paper would cut each panel in half. This section applies only to `*-pamphlet.docx`.

---

## Your printer: Epson L5390

| Property          | Reality                                                                 | What it means here                                                                  |
| ----------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Paper feed        | rear tray, ~100 sheets, A4 maximum                                      | feed loose sheets, not a stack, while testing; A4 only, as above                    |
| Automatic 2-sided | not in the L5390 feature list — **check the driver** before assuming it | use the driver's manual short-edge duplex in A, or Word's manual-duplex prompt in B |
| ADF               | 30 pages, for **scanning and copying** only                             | it never feeds printing; the A4 sheets go in the rear tray                          |
| Borderless        | up to 4R (10 × 15 cm) only, otherwise a 3 mm margin                     | harmless — the pamphlets carry 12.7 mm margins anyway                               |
| Print quality     | **Standard** is enough for 10 pt body text                              | "High"/"Best" only slows the job down                                               |

**Learn the reload before a batch.** The L5390 feeds from the rear, so the reloading direction is not the same as a front-cassette printer. With manual duplex enabled, test PDF pages 1–2 on one sheet; pencil an arrow on the leading edge and an X on the printed face before reloading. Follow the driver prompt and load the blank side face-up:

- back comes out **upside down** → try a 180° rotation on the next test, or check the driver's binding-edge setting;
- printing lands on the **already printed side** → turn the sheet over so the blank side faces up;
- the panels do not line up → check paper size, landscape orientation, and 100 % scaling.

Once one sheet is right, reload the full stack according to the same driver prompt and check the folded page order. If the driver cannot manage manual duplex, route A's sheet-by-sheet method needs no feature beyond "print these pages". See [Epson's L5390 two-sided printing instructions](https://download4.epson.biz/sec_pubs/l5390_series/useg/en/GUID-3A1813CB-AD14-4A43-953F-0DA916935612.htm).

---

## Settings common to both

- **Stock:** 80–100 gsm plain paper. Heavier stock folds badly at A5 panel size.
- **Never** use "Pages per sheet", "Multiple pages per sheet", or a printer-side "booklet"/"booklet layout" option on top of these settings.
- If the back prints upside down, check the selected duplex edge and the reload orientation before trying another test sheet.
- If the panels are smaller than the sheet, or the crease no longer falls on the fold ticks, scaling is the cause — return it to 100 %.
- Print one sheet, fold it, check that the cover faces out and the pages run in order, and only then print the rest.

## Troubleshooting

| Symptom                                               | Cause / fix                                                                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Word's preview shows page 1 beside page 2 on a sheet  | The preview renders logical pages, not the imposition. Print the imposed PDF, or use Word's own booklet preview.           |
| Text interleaved across the fold, halves out of order | A "2 pages per sheet" or booklet option is active in the driver as well. Turn it off — the file already carries the order. |
| Panels shrink and the fold line drifts                | "Fit to printable area" / "Shrink oversized pages" is on. Set 100 %.                                                       |
| Back side upside down                                 | Check **short-edge binding** for the imposed PDF and the manual-reload orientation; test again.                            |
| Last sheet blank or half empty                        | Page count is not a multiple of 4. Use the imposed PDF, whose content was trimmed to fill the pages.                       |
| Book fold unavailable in Word                         | The printer driver does not report duplex. Use the imposed PDF instead.                                                    |

The build procedure for these artifacts — condensing the source, the 10 pt type, the page budget, and the export/impose scripts — is in [.claude/skills/create-pamphlet/SKILL.md](../.claude/skills/create-pamphlet/SKILL.md).
