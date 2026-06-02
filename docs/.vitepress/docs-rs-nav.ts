import type { DefaultTheme } from 'vitepress/theme'

export type DocsRsCrate = 'ublx' | 'nefaxer' | 'zahirscan'

/** Last nav dropdown item — opens the crate API on docs.rs (external-link arrow from VPLink). */
export function docsRsNavItem(crate: DocsRsCrate): DefaultTheme.NavItemWithLink {
  return {
    text: 'API reference',
    link: `https://docs.rs/${crate}`,
  }
}
