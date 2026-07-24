/**
 * TUI / ublx-web favicon mark: rounded square in page bg, “U” in title_brand.
 * Mirrors crates/ublx-web/src/theme.rs `favicon_data_url`.
 *
 * Runtime updates use a blob: URL + fresh <link> node — browsers often ignore
 * in-place href changes (and cache data: favicons) so the tab would stick on
 * Oblivion Ink after the first paint.
 */

let previousBlobUrl: string | null = null

export function faviconSvg(bgHex: string, brandHex: string): string {
  const bg = normalizeHex(bgHex)
  const fg = normalizeHex(brandHex)
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">`,
    `<rect width="32" height="32" rx="4" fill="${bg}"/>`,
    `<text x="16" y="26" text-anchor="middle" `,
    `font-family="ui-monospace,monospace" font-size="30" font-weight="900" `,
    `stroke="${fg}" stroke-width="1.25" paint-order="stroke fill" `,
    `fill="${fg}">U</text>`,
    `</svg>`,
  ].join('')
}

export function faviconDataUrl(bgHex: string, brandHex: string): string {
  return `data:image/svg+xml,${encodeURIComponent(faviconSvg(bgHex, brandHex))}`
}

/** Oblivion Ink — same default as docs site default theme. */
export const DEFAULT_FAVICON_HREF = faviconDataUrl('#0a192f', '#a45ffa')

export function applyFavicon(bgHex: string, brandHex: string): void {
  if (typeof document === 'undefined') return

  const svg = faviconSvg(bgHex, brandHex)
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const href = URL.createObjectURL(blob)

  for (const el of document.querySelectorAll(
    "link[rel='icon'], link[rel='shortcut icon']",
  )) {
    el.remove()
  }

  if (previousBlobUrl) {
    URL.revokeObjectURL(previousBlobUrl)
  }
  previousBlobUrl = href

  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = 'image/svg+xml'
  link.href = href
  document.head.appendChild(link)
}

function normalizeHex(hex: string): string {
  const h = hex.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(h)) return h.toLowerCase()
  if (/^#[0-9a-fA-F]{3}$/.test(h)) {
    const r = h[1]!
    const g = h[2]!
    const b = h[3]!
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return h
}
