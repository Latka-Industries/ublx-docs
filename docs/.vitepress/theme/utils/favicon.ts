/**
 * TUI / ublx-web favicon mark: rounded square in page bg, “U” in title_brand.
 * Mirrors crates/ublx-web/src/theme.rs `favicon_data_url`.
 */

export function faviconDataUrl(bgHex: string, brandHex: string): string {
  const bg = normalizeHex(bgHex)
  const fg = normalizeHex(brandHex)
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">`,
    `<rect width="32" height="32" rx="4" fill="${bg}"/>`,
    `<text x="16" y="26" text-anchor="middle" `,
    `font-family="ui-monospace,monospace" font-size="30" font-weight="900" `,
    `stroke="${fg}" stroke-width="1.25" paint-order="stroke fill" `,
    `fill="${fg}">U</text>`,
    `</svg>`,
  ].join('')
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/** Oblivion Ink — same default as docs site default theme. */
export const DEFAULT_FAVICON_HREF = faviconDataUrl('#0a192f', '#a45ffa')

export function applyFavicon(bgHex: string, brandHex: string): void {
  if (typeof document === 'undefined') return
  const href = faviconDataUrl(bgHex, brandHex)
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
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
