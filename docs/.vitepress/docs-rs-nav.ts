import type { DefaultTheme } from 'vitepress/theme'
import { navLink } from './nav-card'

export type DocsRsCrate = 'ublx' | 'nefaxer' | 'zahirscan'

/** Last nav dropdown item — opens the crate API on docs.rs (external-link arrow from VPLink). */
export function docsRsNavItem(crate: DocsRsCrate): DefaultTheme.NavItemWithLink {
  return navLink('API reference', `${crate} on docs.rs`, `https://docs.rs/${crate}`)
}
