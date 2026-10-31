"""Export a .docx to PDF with the installed Microsoft Word, and report its real page setup.

Word never imposes when exporting: the PDF holds the logical pages (one per page), which is exactly
what impose.py needs.

Usage:
    python export-pdf.py <input.docx> <output.pdf>

Windows only. Requires pywin32 (`pip install pywin32`; on this machine the Aliyun mirror is the one
that answers). The document is copied to a temp folder first, so a file open in the Word UI does not
block the export and is never modified.
"""

import os
import shutil
import sys
import tempfile

import pythoncom
import win32com.client as win32

WD_FORMAT_PDF = 17
WD_STAT_PAGES = 2


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    source = os.path.abspath(sys.argv[1])
    target = os.path.abspath(sys.argv[2])
    if not os.path.exists(source):
        print(f'no such file: {source}')
        return 1

    tmp_docx = os.path.join(tempfile.gettempdir(), 'export-pdf-input.docx')
    shutil.copyfile(source, tmp_docx)
    if os.path.exists(target):
        os.remove(target)

    pythoncom.CoInitialize()
    word = win32.DispatchEx('Word.Application')  # own instance, never the user's window
    word.Visible = False
    word.DisplayAlerts = 0
    try:
        doc = word.Documents.Open(tmp_docx, ReadOnly=True, AddToRecentFiles=False, Visible=False)
        ps = doc.PageSetup
        print(f'Word page size : {ps.PageWidth:.1f} x {ps.PageHeight:.1f} pt '
              f'({ps.PageWidth * 25.4 / 72:.1f} x {ps.PageHeight * 25.4 / 72:.1f} mm)')
        print(f'Book fold      : {bool(ps.BookFoldPrinting)}')
        print(f'Page count     : {int(doc.ComputeStatistics(WD_STAT_PAGES))}')
        doc.SaveAs2(target, FileFormat=WD_FORMAT_PDF)
        doc.Close(False)
    finally:
        word.Quit()
        pythoncom.CoUninitialize()
        if os.path.exists(tmp_docx):
            os.remove(tmp_docx)

    try:
        import pymupdf
    except ImportError:  # older builds only ship the fitz name
        import fitz as pymupdf
    pdf = pymupdf.open(target)
    sizes = {(round(p.rect.width, 1), round(p.rect.height, 1)) for p in pdf}
    print(f'PDF pages      : {pdf.page_count} at {sorted(sizes)} pt')
    if pdf.page_count % 4:
        print(f'WARNING: {pdf.page_count} pages is not a multiple of 4 — a saddle-stitched booklet '
              f'needs 4, 8, 12, ... Trim content or pad with blanks.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
