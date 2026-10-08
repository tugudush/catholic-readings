# Agent Skills — Install Guide

This folder holds project-scoped agent skills installed with `gh skill install`. Each skill is a
vendored third-party copy: its source files are tracked in git, but the `node_modules` a skill
installs for itself is not.

- **md-to-docx** — from `github/awesome-copilot`; needs the `docx` and `marked` packages. See
  [md-to-docx/SKILL.md](md-to-docx/SKILL.md) for what it does.

## Why packages are installed per skill

Every skill that ships a script brings its own manifest — here, `md-to-docx/scripts/package.json`.
The root manifest declares no `workspaces`, so a root `npm install` never reaches them: it only
installs the root devDependencies (`prettier`) into the root `node_modules`.

```bash
npm pkg get workspaces   # -> {}
```

Because there is no workspace linking, **a fresh clone has no skill dependencies**: each skill's
own `node_modules` is git-ignored, so it is absent until you install it once.

## Re-installing the packages

Run this after a fresh clone, or after `gh skill install --force` or `gh skill update` replaces a
skill. Every command below runs from the repository root; the last two assume a POSIX shell
(Git Bash, macOS, Linux).

```bash
# One skill, without leaving the root
npm --prefix .agents/skills/md-to-docx/scripts install
```

Or equivalently, from inside the skill's script folder:

```bash
cd .agents/skills/md-to-docx/scripts && npm install
```

To install the dependencies of every skill in this folder in one pass:

```bash
find .agents/skills -name package.json -not -path '*/node_modules/*' \
  -exec sh -c 'npm --prefix "$(dirname "$1")" install' _ {} \;
```

### Verify the install

```bash
npm --prefix .agents/skills/md-to-docx/scripts ls --depth=0
```

Expected output:

```text
scripts@ C:\devworks\holy-agent\.agents\skills\md-to-docx\scripts
├── docx@9.8.1
└── marked@17.0.6
```

## Running the converter

```bash
node .agents/skills/md-to-docx/scripts/md-to-docx.mjs <input.md> [output.docx]
```

If the output name is omitted it defaults to `<input-basename>.docx` in the current directory.
Image references resolve relative to the input file's own directory. See
[md-to-docx/SKILL.md](md-to-docx/SKILL.md) for front-matter format, supported elements, and options.

## Local patches — read before updating a skill

`md-to-docx/scripts/md-to-docx.mjs` carries local patches that are **not** in the upstream skill
(front-matter stripping anchored to the start of the file, title-page fallback for a dash-less H1,
blockquote rendering, paragraphs holding multiple images, loose-list bodies, and inline HTML
anchors). These are committed here, so git is the record of them.

`gh skill install --force` and `gh skill update --force` re-download a skill's files and will
overwrite these patches. Because the sources are tracked, the damage is visible and reversible:

```bash
git diff -- .agents/skills/            # what the re-install changed
git restore .agents/skills/md-to-docx/ # put the patched version back
```

To freeze a skill at a known revision so updates skip it, install it pinned:

```bash
gh skill install github/awesome-copilot md-to-docx --pin <tag-or-sha>
```

## Housekeeping

- Prettier does not format this folder — it is listed in [.prettierignore](../../.prettierignore).
- Installed dependencies never enter git: the `node_modules/` rule in `.gitignore` matches at any
  depth, including inside a skill.
- Each skill's `package-lock.json` **is** tracked, so installing can dirty the working tree. Commit
  or discard it deliberately rather than letting it accumulate.
