"""Impose a one-page-per-side PDF into saddle-stitch sheet order.

Each output page is one side of a folded sheet: the source page that belongs on the left half, then
the one on the right. For n pages and sheet i (1 = outermost sheet):

    front = (n - 2*(i-1), 2*i - 1)
    back  = (2*i,         n - 2*i + 1)

which for n = 8 gives 8|1, 2|7, 6|3, 4|5.

Usage:
    python impose.py <input.pdf> <output.pdf> [--pad] [--tick PT]

--pad    append blank pages until the count is a multiple of 4 (last resort; trimming reads better)
--tick   fold-tick length in points, 0 disables (default 14)
"""

import argparse
import sys

try:
    import pymupdf
except ImportError:  # older builds only ship the fitz name
    import fitz as pymupdf


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('input')
    ap.add_argument('output')
    ap.add_argument('--pad', action='store_true', help='append blank pages to reach a multiple of 4')
    ap.add_argument('--tick', type=float, default=14.0, help='fold-tick length in points (0 = off)')
    args = ap.parse_args()

    src = pymupdf.open(args.input)
    panel_w, panel_h = src[0].rect.width, src[0].rect.height
    for page in src:
        if abs(page.rect.width - panel_w) > 1 or abs(page.rect.height - panel_h) > 1:
            print('all pages must share one size before imposing')
            return 1

    count = src.page_count
    if count % 4:
        if not args.pad:
            print(f'{count} pages is not a multiple of 4 — trim the document or pass --pad')
            return 1
        for _ in range(4 - count % 4):
            src.new_page(width=panel_w, height=panel_h)
        print(f'padded {count} -> {src.page_count} pages with blanks')
        count = src.page_count

    out = pymupdf.open()
    sheets = count // 4
    for i in range(1, sheets + 1):
        sides = ((count - 2 * (i - 1), 2 * i - 1), (2 * i, count - 2 * i + 1))
        for side, (left, right) in enumerate(sides):
            sheet = out.new_page(width=panel_w * 2, height=panel_h)
            for k, pageno in enumerate((left, right)):
                sheet.show_pdf_page(
                    pymupdf.Rect(k * panel_w, 0, (k + 1) * panel_w, panel_h), src, pageno - 1
                )
            if args.tick:
                for y0, y1 in ((0, args.tick), (panel_h - args.tick, panel_h)):
                    sheet.draw_line(
                        pymupdf.Point(panel_w, y0),
                        pymupdf.Point(panel_w, y1),
                        color=(0.75, 0.75, 0.75),
                        width=0.4,
                    )
            label = 'front' if side == 0 else 'back'
            print(f'sheet {i} {label}: {left} | {right}')

    out.set_metadata({'title': f'{sheets}-sheet saddle-stitch imposition'})
    out.save(args.output, garbage=4, deflate=True)
    print(f'wrote {args.output} — {out.page_count} sides of '
          f'{panel_w * 2 * 25.4 / 72:.0f} x {panel_h * 25.4 / 72:.0f} mm')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
