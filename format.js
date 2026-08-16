#!/usr/bin/env node
/**
 * format.js — run Prettier over every document in the repository.
 *
 * Walks the tree for the supported document and source file extensions,
 * resolves each file's Prettier configuration, and either writes the
 * formatted output (default) or reports which files would change
 * (`--check`). Directories that are not meant to be committed — the
 * private content listed in .gitignore, version control, and installed
 * dependencies — are always skipped.
 *
 * Usage:
 *   node format.js          format all documents in place
 *   node format.js --check  report files that would be reformatted
 *
 * Also exposed through npm as `npm run format` and `npm run format:check`.
 */

'use strict'

const fs = require('node:fs')
const path = require('node:path')
const prettier = require('prettier')

const ROOT = path.resolve(__dirname)

/** Directories that are never formatted. */
const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'private-assets',
  'private-confessions',
  'other-matters',
])

/** File extensions treated as documents. */
const EXTENSIONS = new Set([
  '.md',
  '.mdx',
  '.json',
  '.jsonc',
  '.yml',
  '.yaml',
  '.js',
  '.mjs',
  '.cjs',
  '.ts',
  '.tsx',
])

/** Recursively collect format-eligible files, skipping ignored directories. */
function collectFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue
      files.push(...collectFiles(fullPath))
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function main() {
  const checkOnly = process.argv.includes('--check')
  const files = collectFiles(ROOT).sort()
  const relative = (file) => path.relative(ROOT, file).split(path.sep).join('/')

  let changed = 0
  let skipped = 0

  for (const file of files) {
    let options
    try {
      options = await prettier.resolveConfig(file)
    } catch (err) {
      console.warn(`! could not resolve config for ${relative(file)}: ${err.message}`)
      skipped++
      continue
    }

    const source = fs.readFileSync(file, 'utf8')
    let formatted
    try {
      formatted = await prettier.format(source, { ...options, filepath: file })
    } catch (err) {
      console.warn(`! could not format ${relative(file)}: ${err.message}`)
      skipped++
      continue
    }

    if (formatted === source) continue

    if (checkOnly) {
      console.log(`- would reformat ${relative(file)}`)
    } else {
      fs.writeFileSync(file, formatted)
      console.log(`+ formatted ${relative(file)}`)
    }
    changed++
  }

  console.log('')
  if (checkOnly) {
    console.log(
      changed === 0
        ? `All ${files.length} documents are already formatted.`
        : `${changed} of ${files.length} documents would be reformatted.`,
    )
  } else {
    console.log(`Formatted ${changed} of ${files.length} documents.`)
  }
  if (skipped > 0) {
    console.warn(`${skipped} document(s) skipped due to errors.`)
  }
  process.exitCode = checkOnly && changed > 0 ? 1 : 0
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
