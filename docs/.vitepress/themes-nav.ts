export function themeAnchor(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export const themesNavItem = {
  text: 'Themes & palettes',
  items: [
    { text: 'Overview', link: '/themes' },
    { text: 'Dark themes', link: '/themes#dark-themes' },
    { text: 'Light themes', link: '/themes#light-themes' },
  ],
}

export const themesSidebarItem = {
  text: 'Themes & palettes',
  collapsed: true,
  items: [
    { text: 'Overview', link: '/themes' },
    { text: 'Dark themes', link: '/themes#dark-themes' },
    { text: 'Light themes', link: '/themes#light-themes' },
  ],
}
