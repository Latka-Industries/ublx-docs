import { navLink } from './nav-card'

export function themeAnchor(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

/** Top nav: one card. Dark and light anchors stay in the sidebar. */
export const themesNavItem = navLink(
  'Themes & palettes',
  'Built-in color themes',
  '/themes',
  '^/themes',
)

export const themesSidebarItem = {
  text: 'Themes & palettes',
  collapsed: true,
  items: [
    { text: 'Overview', link: '/themes' },
    { text: 'Dark themes', link: '/themes#dark-themes' },
    { text: 'Light themes', link: '/themes#light-themes' },
  ],
}
