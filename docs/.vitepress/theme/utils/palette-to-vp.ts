export type PaletteColors = Record<string, { rgb: number[]; hex: string }>

export type PaletteEntry = {
  name: string
  appearance: 'dark' | 'light'
  colors: PaletteColors
}

function rgbMix(a: number[], b: number[], weight: number): number[] {
  const w = Math.max(0, Math.min(1, weight))
  return [0, 1, 2].map((i) => Math.round(a[i]! * (1 - w) + b[i]! * w))
}

function toHex(rgb: number[]): string {
  return '#' + rgb.map((x) => x.toString(16).padStart(2, '0')).join('')
}

function rgba(rgb: number[], alpha: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
}

function rgbToHslParts(rgb: number[]): string {
  const r = rgb[0]! / 255
  const g = rgb[1]! / 255
  const b = rgb[2]! / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      default:
        h = ((r - g) / d + 4) / 6
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

const VP_KEYS = [
  '--vp-c-bg',
  '--vp-c-bg-alt',
  '--vp-c-bg-soft',
  '--vp-c-bg-elv',
  '--vp-c-text-1',
  '--vp-c-text-2',
  '--vp-c-text-3',
  '--vp-c-border',
  '--vp-c-divider',
  '--vp-c-gutter',
  '--vp-c-brand',
  '--vp-c-brand-1',
  '--vp-c-brand-2',
  '--vp-c-brand-3',
  '--vp-c-brand-soft',
  '--vp-c-indigo-1',
  '--vp-c-indigo-2',
  '--vp-c-indigo-3',
  '--vp-c-indigo-soft',
  '--vp-c-tip-1',
  '--vp-c-tip-2',
  '--vp-c-tip-3',
  '--vp-c-tip-soft',
  '--vp-c-note-1',
  '--vp-c-note-2',
  '--vp-c-note-3',
  '--vp-c-note-soft',
] as const

const SHADCN_KEYS = [
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--primary',
  '--primary-foreground',
  '--secondary',
  '--secondary-foreground',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
  '--border',
  '--input',
  '--ring',
] as const

export function paletteToCssVars(entry: PaletteEntry): Record<string, string> {
  const bg = entry.colors.background!.rgb
  const text = entry.colors.text!.rgb
  const focus = entry.colors.focused_border!.rgb
  const tab = entry.colors.tab_active_bg!.rgb
  const search = entry.colors.search_text!.rgb
  const hint = entry.colors.hint!.rgb
  const isDark = entry.appearance === 'dark'
  const lift = isDark ? [255, 255, 255] : [0, 0, 0]

  const bgAlt = rgbMix(bg, lift, isDark ? 0.08 : 0.05)
  const bgSoft = rgbMix(bg, lift, isDark ? 0.14 : 0.07)
  const bgElv = rgbMix(bg, lift, isDark ? 0.2 : 0.1)
  const text3 = rgbMix(hint, bg, 0.45)
  const border = rgbMix(bg, text, 0.38)
  const divider = rgbMix(bg, text, 0.24)

  const brandSoft = rgba(focus, isDark ? 0.18 : 0.14)

  const vp: Record<string, string> = {
    '--vp-c-bg': entry.colors.background!.hex,
    '--vp-c-bg-alt': toHex(bgAlt),
    '--vp-c-bg-soft': toHex(bgSoft),
    '--vp-c-bg-elv': toHex(bgElv),
    '--vp-c-text-1': entry.colors.text!.hex,
    '--vp-c-text-2': entry.colors.hint!.hex,
    '--vp-c-text-3': toHex(text3),
    '--vp-c-border': toHex(border),
    '--vp-c-divider': toHex(divider),
    '--vp-c-gutter': toHex(divider),
    '--vp-c-brand': entry.colors.focused_border!.hex,
    '--vp-c-brand-1': entry.colors.focused_border!.hex,
    '--vp-c-brand-2': entry.colors.search_text!.hex,
    '--vp-c-brand-3': entry.colors.tab_active_bg!.hex,
    '--vp-c-brand-soft': brandSoft,
    '--vp-c-indigo-1': entry.colors.focused_border!.hex,
    '--vp-c-indigo-2': entry.colors.search_text!.hex,
    '--vp-c-indigo-3': entry.colors.tab_active_bg!.hex,
    '--vp-c-indigo-soft': brandSoft,
    '--vp-c-tip-1': entry.colors.focused_border!.hex,
    '--vp-c-tip-2': entry.colors.search_text!.hex,
    '--vp-c-tip-3': entry.colors.tab_active_bg!.hex,
    '--vp-c-tip-soft': brandSoft,
    '--vp-c-note-1': entry.colors.focused_border!.hex,
    '--vp-c-note-2': entry.colors.search_text!.hex,
    '--vp-c-note-3': entry.colors.tab_active_bg!.hex,
    '--vp-c-note-soft': brandSoft,
  }

  const primaryFg = isDark ? toHex(bg) : '#ffffff'
  const shadcn: Record<string, string> = {
    '--background': rgbToHslParts(bg),
    '--foreground': rgbToHslParts(text),
    '--card': rgbToHslParts(bgSoft),
    '--card-foreground': rgbToHslParts(text),
    '--primary': rgbToHslParts(focus),
    '--primary-foreground': rgbToHslParts(isDark ? bg : [255, 255, 255]),
    '--secondary': rgbToHslParts(bgAlt),
    '--secondary-foreground': rgbToHslParts(text),
    '--muted': rgbToHslParts(bgAlt),
    '--muted-foreground': rgbToHslParts(hint),
    '--accent': rgbToHslParts(tab),
    '--accent-foreground': rgbToHslParts(isDark ? bg : [255, 255, 255]),
    '--border': rgbToHslParts(border),
    '--input': rgbToHslParts(border),
    '--ring': rgbToHslParts(focus),
  }

  return { ...vp, ...shadcn, '--ublx-primary-fg': primaryFg }
}

export function applyUblxSiteTheme(entry: PaletteEntry): void {
  const root = document.documentElement
  root.classList.toggle('dark', entry.appearance === 'dark')
  root.classList.add('ublx-site-theme')
  root.dataset.ublxTheme = entry.name

  const vars = paletteToCssVars(entry)
  for (const key of VP_KEYS) {
    const v = vars[key]
    if (v) root.style.setProperty(key, v)
  }
  for (const key of SHADCN_KEYS) {
    const v = vars[key]
    if (v) root.style.setProperty(key, v)
  }
}

export function clearUblxSiteTheme(): void {
  const root = document.documentElement
  root.classList.remove('ublx-site-theme')
  delete root.dataset.ublxTheme
  for (const key of [...VP_KEYS, ...SHADCN_KEYS]) {
    root.style.removeProperty(key)
  }
  root.style.removeProperty('--ublx-primary-fg')
}
