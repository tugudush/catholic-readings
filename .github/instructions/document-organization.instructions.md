---
description: 'Use when creating a new reading, article, or document markdown file in this repository. Enforces placement into the proper topic directory, creation of a new directory when none fits, and selection of a topic-fitting filename. Auto-attaches for every markdown file in context.'
applyTo: '**/*.md'
name: 'Document Organization & Placement'
---

# Document Organization & Placement

When creating any new reading, article, or document in this repository, organize it deliberately. This repo is structured as a topical database — every document belongs to a specific topic directory, and every filename must clearly describe its subject.

## 1. Consult the Directory Map First

Before creating a file, review the canonical directory map in [AGENTS.md](../../AGENTS.md) under **Repository Structure & Directory Map**. This is the single source of truth for where each topic lives.

Current topic directories:

- [scripture/](../../scripture/) — Sacred Scripture, canon, translations
- [angelology/](../../angelology/) — Angels, choirs, fallen angels
- [church-history/](../../church-history/) — Councils, popes, schisms, relations with other communions
- [liturgy/](../../liturgy/) — Prayers, sacraments, devotionals
- [miracles/](../../miracles/) — Approved apparitions, Eucharistic miracles, saint phenomena, private revelations

## 2. Placement Rules

| Situation                                                                                         | Action                                                                  |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Topic clearly fits an existing directory                                                          | Place the file inside that directory (or its relevant subdirectory)     |
| Topic spans two existing directories                                                              | Place it in the **primary** directory and cross-link from the secondary |
| Topic fits no existing directory                                                                  | **Create a new topically named directory** at the repository root       |
| Topic belongs to a subtopic that already has its own folder (e.g. `miracles/marian-apparitions/`) | Place the file inside that subfolder                                    |

When creating a **new directory**, follow these conventions:

- Use a lowercase, plural, single-word noun when possible (e.g. `saints/`, `sacramentals/`, `devotions/`)
- Use a hyphenated phrase only when a single word is genuinely insufficient (e.g. `religious-orders/`)
- Add a short `README.md` inside the new directory explaining its scope, in the same style as [miracles/README.md](../../miracles/README.md)
- Add the new directory to the **Repository Structure & Directory Map** section in [AGENTS.md](../../AGENTS.md)
- Link it from the master [README.md](../../README.md) portal

## 3. Filename Conventions

The filename **must clearly suit the topic**. A reader scanning the directory listing should be able to tell what each file covers.

- Use **kebab-case** lowercase (e.g. `eucharistic-miracles.md`, not `Eucharistic Miracles.md` or `eucharistic_miracles.md`)
- Prefer **specific, descriptive** names over generic ones
  - Good: `bolsena-orvieto.md`, `fatima.md`, `stigmata-padre-pio.md`
  - Avoid: `miracle-1.md`, `notes.md`, `untitled.md`
- For saints, append the saint's name: `st-januarius.md`, `st-faustina.md`, `st-margaret-mary.md`
- For events, use the place or proper name: `guadalupe.md`, `lourdes.md`, `lepanto.md`
- Match the naming depth of nearby files in the same directory for consistency

## 4. Update Cross-References

After creating a file or directory:

- Add it to the **Repository Structure & Directory Map** in [AGENTS.md](../../AGENTS.md)
- Link it from the master [README.md](../../README.md) portal index
- Add relative links from any closely related documents (the **Link, don't embed** principle)
- If you created a new subtopic folder, ensure the parent directory's `README.md` references it

## 5. Quick Checklist Before Saving

- [ ] The directory is the correct topic location (or a new one was deliberately created)
- [ ] The filename is kebab-case and clearly describes the subject
- [ ] [AGENTS.md](../../AGENTS.md) directory map has been updated
- [ ] [README.md](../../README.md) portal has been updated
- [ ] Related files now cross-link to the new document
