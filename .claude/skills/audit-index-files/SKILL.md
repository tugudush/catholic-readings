---
name: audit-index-files
description: 'Audit index files (README.md, AGENTS.md) against actual repo content — find missing, stale, or incomplete file references and fix them in one pass.'
disable-model-invocation: true
argument-hint: 'Which index files? (default: README.md AGENTS.md)'
---
Audit the specified repository index files against the actual content on disk and fix all discrepancies. Default targets are `README.md` and `AGENTS.md`.

## Procedure

### 1. Discover Actual Content

Enumerate every tracked markdown file, plus any new file not yet committed, while excluding agent configuration and every path git ignores (the private content directories and downloaded media must never surface as index discrepancies):

```powershell
git ls-files --cached --others --exclude-standard '*.md' |
  Where-Object { $_ -notmatch '^\.(claude|github)/' } | Sort-Object
```

In a POSIX shell the same listing is `git ls-files --cached --others --exclude-standard '*.md' | grep -v -E '^\.(claude|github)/' | sort`.

Also list the contents of each top-level topic folder so that directories, not only files, can be checked against the index.

### 2. Read Index Files

Read the specified index files in full (default: `README.md` and `AGENTS.md`). Note both files use clean markdown links — no backticks around file paths.

### 3. Cross-Reference

For each index file, identify:

- **Missing references**: Files on disk not mentioned anywhere in the index
- **Stale references**: Files referenced in the index that no longer exist on disk
- **Under-listed directories**: Directories where the index uses "e.g." or "such as" but omits several existing files
- **Missing directories**: Entire topic folders present on disk but absent from the index
- **Mismatched annotations**: Entries whose description no longer matches what the file actually contains

### 4. Apply Fixes

Update the index files to accurately reflect current repository content, following these repository-specific conventions:

- Use clean markdown links: `[path/to/file.md](path/to/file.md)` — never wrap paths in backticks
- List files individually with a brief descriptive annotation
- New sections follow the existing numbering and heading hierarchy
- Follow the **Link, don't embed** principle — reference files rather than duplicating content
- Use formal ecclesiastical terminology (e.g., _Blessed Virgin Mary_, _transubstantiation_, _sui iuris_)
- Distinguish levels of doctrinal weight: dogma, discipline, private revelation, theological opinion
- For new sections, write descriptions that match the scholarly, historically-grounded tone of existing entries
- For `AGENTS.md`, mirror the exact structure of its directory map entries (directory header, then individual file entries with descriptions)
- Keep `README.md` and `AGENTS.md` consistent with each other — a document added to one belongs in the other unless the difference is deliberate

### 5. Full Re-Scan Verification

After applying all edits, re-run the discovery command from step 1 and confirm zero discrepancies remain. Then read the modified sections in both index files to verify formatting, link correctness, and descriptive quality. If any discrepancy persists, apply additional fixes until the indexes are fully accurate.
