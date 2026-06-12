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

function resolveStoredThemeName(): string {
  if (typeof document === 'undefined') return DEFAULT_THEME_NAME

  const applied = document.documentElement.dataset.ublxTheme
  if (applied && findPalette(applied)) return applied

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && findPalette(stored)) return stored
  } catch {
    /* private mode */
  }

  const pending = document.documentElement.dataset.ublxThemePending
  if (pending && findPalette(pending)) return pending

  return DEFAULT_THEME_NAME
}

export const selectedName = ref(
  typeof document !== 'undefined' ? resolveStoredThemeName() : DEFAULT_THEME_NAME,
)

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
  const name = resolveStoredThemeName()
  if (name === selectedName.value && document.documentElement.dataset.ublxTheme === name) {
    return
  }
  applySiteThemeByName(name)
}

export function stepSiteTheme(delta: 1 | -1): void {
  const idx = allThemes.findIndex((t) => t.name === selectedName.value)
  if (idx === -1) return
  const next = (idx + delta + allThemes.length) % allThemes.length
  applySiteThemeByName(allThemes[next]!.name)
}

export function shuffleSiteTheme(): void {
  if (allThemes.length === 0) return
  if (allThemes.length === 1) {
    applySiteThemeByName(allThemes[0]!.name)
    return
  }
  let next = selectedName.value
  while (next === selectedName.value) {
    next = allThemes[Math.floor(Math.random() * allThemes.length)]!.name
  }
  applySiteThemeByName(next)
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
    shuffleTheme: shuffleSiteTheme,
    restore: restoreSiteTheme,
  }
}

const darkThemeNames = (paletteData.dark as PaletteEntry[]).map((t) => t.name)

export function buildThemeInitScript(): string {
  const darkSet = JSON.stringify(darkThemeNames)
  return `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_THEME_NAME)};var dark=new Set(${darkSet});var n=localStorage.getItem(k)||d;var r=document.documentElement;r.classList.toggle("dark",dark.has(n));r.dataset.ublxThemePending=n;}catch(e){}})();`
}
