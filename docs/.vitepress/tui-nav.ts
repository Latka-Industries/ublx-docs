import { navLink } from './nav-card'

/** Top nav: one card. The full tree stays in the sidebar. */
export const tuiNavItem = navLink(
  'TUI & modes',
  'Layout, snapshot, lenses, delta',
  '/tui/',
  '^/tui/',
)

export const tuiSidebarItem = {
  text: 'TUI & modes',
  collapsed: true,
  items: [
    { text: 'Overview', link: '/tui/' },
    { text: 'Layout & keys', link: '/tui/layout-and-keys' },
    {
      text: 'Main tabs',
      collapsed: false,
      items: [
        { text: 'Snapshot', link: '/tui/snapshot' },
        { text: 'Lenses', link: '/tui/lenses' },
        { text: 'Delta', link: '/tui/delta' },
        { text: 'Duplicates', link: '/tui/duplicates' },
        { text: 'Settings', link: '/tui/settings' },
      ],
    },
    {
      text: 'Right pane',
      collapsed: false,
      items: [
        { text: 'Viewer', link: '/tui/right-pane/viewer' },
        { text: 'Templates', link: '/tui/right-pane/templates' },
        { text: 'Metadata', link: '/tui/right-pane/metadata' },
        { text: 'Writing', link: '/tui/right-pane/writing' },
      ],
    },
  ],
}
