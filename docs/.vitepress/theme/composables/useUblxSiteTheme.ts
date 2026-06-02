import { computed, ref } from 'vue'
import paletteData from '../data/themes-palettes.json'
import {
  applyUblxSiteTheme,
  type PaletteEntry,
} from '../utils/palette-to-vp'

export const STORAGE_KEY = 'ublx-docs-site-theme'
export const DEFAULT_THEME_NAME = 'Oblivion Ink'

const allThemes: PaletteEntry[] = [
  ...(paletteData.dark as PaletteEntry[]),
  ...(paletteData.light as PaletteEntry[]),
]

const byName = new Map(allThemes.map((t) => [t.name, t]))

export function findPalette(name: string): PaletteEntry | undefined {
  return byName.get(name)
}

export const selectedName = ref(DEFAULT_THEME_NAME)

export function applySiteThemeByName(name: string): void {
  if (typeof document === 'undefined') return
  const entry = findPalette(name)
  if (!entry) return
  selectedName.value = name
  applyUblxSiteTheme(entry)
  try {
    localStorage.setItem(STORAGE_KEY, name)
  } catch {
    /* private mode */
  }
}

export function restoreSiteTheme(): void {
  if (typeof document === 'undefined') return
  let name = DEFAULT_THEME_NAME
  try {
    name = localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME_NAME
  } catch {
    /* ignore */
  }
  if (!findPalette(name)) name = DEFAULT_THEME_NAME
  applySiteThemeByName(name)
}

export function stepSiteTheme(delta: 1 | -1): void {
  const idx = allThemes.findIndex((t) => t.name === selectedName.value)
  if (idx === -1) return
  const next = (idx + delta + allThemes.length) % allThemes.length
  applySiteThemeByName(allThemes[next]!.name)
}

export function useUblxSiteTheme() {
  const selectedPalette = computed(() => findPalette(selectedName.value))

  return {
    selectedName,
    selectedPalette,
    allThemes,
    darkThemes: paletteData.dark as PaletteEntry[],
    lightThemes: paletteData.light as PaletteEntry[],
    applyByName: applySiteThemeByName,
    stepTheme: stepSiteTheme,
    restore: restoreSiteTheme,
  }
}

const darkThemeNames = (paletteData.dark as PaletteEntry[]).map((t) => t.name)

export function buildThemeInitScript(): string {
  const darkSet = JSON.stringify(darkThemeNames)
  return `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_THEME_NAME)};var dark=new Set(${darkSet});var n=localStorage.getItem(k)||d;var r=document.documentElement;r.classList.toggle("dark",dark.has(n));r.dataset.ublxThemePending=n;}catch(e){}})();`
}
