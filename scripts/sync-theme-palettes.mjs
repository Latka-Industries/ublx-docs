#!/usr/bin/env node
/**
 * Regenerate docs/.vitepress/theme/data/themes-palettes.json from UBLX palettes.rs.
 * Usage: node scripts/sync-theme-palettes.mjs [path-to-palettes.rs]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcPath =
  process.argv[2] ??
  path.join(process.env.HOME ?? '', 'Code/Latka-Industries/UBLX/src/themes/palettes.rs')

if (!fs.existsSync(srcPath)) {
  console.error(`Missing palettes.rs: ${srcPath}`)
  console.error('Pass a path: node scripts/sync-theme-palettes.mjs /path/to/palettes.rs')
  process.exit(1)
}

const src = fs.readFileSync(srcPath, 'utf8')

function rgb(s) {
  const m = (s || '').match(/Color::Rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0]
}

function hex(c) {
  return '#' + c.map((x) => x.toString(16).padStart(2, '0')).join('')
}

const blocks = src.split(/pub static \w+: Palette = Palette \{/)
const palettes = []

for (const block of blocks.slice(1)) {
  const nameM = block.match(/name: "([^"]+)"/)
  const appM = block.match(/appearance: Appearance::(\w+)/)
  if (!nameM) continue
  const pick = (key) =>
    rgb((block.match(new RegExp(`${key}: Color::Rgb\\([^)]+\\)`)) || [])[0])
  const keys = [
    'background',
    'text',
    'focused_border',
    'tab_active_bg',
    'search_text',
    'hint',
    'title_brand',
  ]
  const colors = {}
  for (const k of keys) {
    const rgbVal = pick(k)
    colors[k] = { rgb: rgbVal, hex: hex(rgbVal) }
  }
  palettes.push({
    name: nameM[1],
    appearance: appM[1].toLowerCase(),
    colors,
  })
}

const dark = palettes
  .filter((p) => p.appearance === 'dark')
  .sort((a, b) => a.name.localeCompare(b.name))
const light = palettes
  .filter((p) => p.appearance === 'light')
  .sort((a, b) => a.name.localeCompare(b.name))

const out = path.join(root, 'docs/.vitepress/theme/data/themes-palettes.json')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify({ dark, light }, null, 2) + '\n')
console.log(`Wrote ${out} (${dark.length} dark, ${light.length} light)`)
