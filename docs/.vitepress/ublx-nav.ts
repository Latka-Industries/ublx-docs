import { themesSidebarItem } from './themes-nav'
import { tuiSidebarItem } from './tui-nav'

type UblxSidebarOptions = {
  expandTui?: boolean
  expandThemes?: boolean
}

export function ublxSidebar(options: UblxSidebarOptions = {}) {
  return {
    text: 'UBLX',
    items: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'CLI', link: '/cli' },
      { text: 'Configuration', link: '/configuration' },
      { ...tuiSidebarItem, collapsed: options.expandTui ? false : tuiSidebarItem.collapsed },
      {
        ...themesSidebarItem,
        collapsed: options.expandThemes ? false : themesSidebarItem.collapsed,
      },
    ],
  }
}
