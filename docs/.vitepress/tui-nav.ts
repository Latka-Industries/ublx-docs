export const tuiNavItem = {
  text: 'TUI & modes',
  items: [
    { text: 'Overview', link: '/tui/' },
    { text: 'Layout & keys', link: '/tui/layout-and-keys' },
    { text: 'Snapshot', link: '/tui/snapshot' },
    { text: 'Viewer', link: '/tui/right-pane/viewer' },
    { text: 'Templates', link: '/tui/right-pane/templates' },
    { text: 'Metadata', link: '/tui/right-pane/metadata' },
    { text: 'Writing', link: '/tui/right-pane/writing' },
    { text: 'Lenses', link: '/tui/lenses' },
    { text: 'Delta', link: '/tui/delta' },
    { text: 'Duplicates', link: '/tui/duplicates' },
    { text: 'Settings', link: '/tui/settings' },
  ],
}

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
