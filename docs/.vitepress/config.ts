import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { docsRsNavItem } from './docs-rs-nav'
import { buildThemeInitScript } from './theme/composables/useUblxSiteTheme'
import { DEFAULT_FAVICON_HREF } from './theme/utils/favicon'
import { themesNavItem } from './themes-nav'
import { metadataNavLink, metadataNavItems } from './metadata-nav'
import { tuiNavItem } from './tui-nav'
import { ublxSidebar } from './ublx-nav'

/** Product / section label for local-search breadcrumbs (UBLX vs Nefaxer vs …). */
function searchSectionLabel(relativePath: string): string | undefined {
  if (relativePath === 'index.md') return undefined
  if (relativePath.startsWith('zahirscan/')) return 'ZahirScan'
  if (relativePath.startsWith('nefaxer/')) return 'Nefaxer'
  if (relativePath.startsWith('guides/')) return 'Guides'
  return 'UBLX'
}

export default defineConfig({
  title: 'UBLX & Co',
  description: 'Documentation for UBLX, Nefaxer, and ZahirScan — the Latka Industries catalog stack.',
  base: '/',
  appearance: false,
  head: [
    ['link', { rel: 'icon', href: DEFAULT_FAVICON_HREF }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
    [
      'script',
      { id: 'ublx-site-theme-init' },
      buildThemeInitScript(),
    ],
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  themeConfig: {
    nav: [
      {
        text: 'UBLX',
        activeMatch: '^/(getting-started|cli|configuration|tui|themes)(\\.html)?(/|$)',
        items: [
          { text: 'Install', link: '/getting-started' },
          { text: 'CLI', link: '/cli' },
          { text: 'Configuration', link: '/configuration' },
          tuiNavItem,
          themesNavItem,
          docsRsNavItem('ublx'),
        ],
      },
      {
        text: 'ZahirScan',
        activeMatch: '^/zahirscan/',
        items: [
          { text: 'Overview', link: '/zahirscan/' },
          { text: 'Install', link: '/zahirscan/install' },
          { text: 'CLI', link: '/zahirscan/cli' },
          { text: 'Supported formats', link: '/zahirscan/formats' },
          metadataNavLink,
          { text: 'Template mining', link: '/zahirscan/templates' },
          { text: 'Writing footprint', link: '/zahirscan/writing-footprint' },
          { text: 'Architecture', link: '/zahirscan/architecture' },
          { text: 'Configuration', link: '/zahirscan/configuration' },
          { text: 'Library', link: '/zahirscan/library' },
          { text: 'UBLX integration', link: '/zahirscan/ublx' },
          docsRsNavItem('zahirscan'),
        ],
      },
      {
        text: 'Nefaxer',
        activeMatch: '^/nefaxer/',
        items: [
          { text: 'Overview', link: '/nefaxer/' },
          { text: 'Install', link: '/nefaxer/install' },
          { text: 'CLI', link: '/nefaxer/cli' },
          { text: 'Architecture', link: '/nefaxer/architecture' },
          { text: 'Configuration', link: '/nefaxer/configuration' },
          { text: 'Database schema', link: '/nefaxer/database' },
          { text: 'Library', link: '/nefaxer/library' },
          { text: 'UBLX integration', link: '/nefaxer/ublx' },
          docsRsNavItem('nefaxer'),
        ],
      },
      {
        text: 'Guides',
        activeMatch: '^/guides/',
        items: [
          { text: 'Overview', link: '/guides/' },
          { text: 'FAQ', link: '/guides/faq' },
          { text: 'Snapshot & browse', link: '/guides/snapshot-and-browse' },
          { text: 'Path-only vs full enhance', link: '/guides/path-only-vs-full-enhance' },
          { text: 'Right-pane previews', link: '/guides/right-pane-previews' },
          { text: 'Making & exporting lenses', link: '/guides/lenses' },
          { text: 'Change & duplicates', link: '/guides/change-and-duplicates' },
          { text: 'Built for project trees', link: '/guides/project-trees' },
          { text: 'Enhance policies', link: '/guides/enhance-policies' },
          { text: 'Headless snapshot + export', link: '/guides/headless-snapshot-export' },
          { text: 'Command mode & menus', link: '/guides/command-mode-and-menus' },
        ],
      },
      {
        text: 'GitHub',
        items: [
          { text: 'UBLX', link: 'https://github.com/Latka-Industries/UBLX' },
          { text: 'ZahirScan', link: 'https://github.com/Latka-Industries/zahirscan' },
          { text: 'Nefaxer', link: 'https://github.com/Latka-Industries/nefaxer' },
        ],
      },
      { component: 'NavBarTrailing' },
    ],
    sidebar: {
      '/': [ublxSidebar()],
      '/tui/': [ublxSidebar({ expandTui: true })],
      '/themes': [ublxSidebar({ expandThemes: true })],
      '/zahirscan/': [
        {
          text: 'ZahirScan',
          items: [
            { text: 'Overview', link: '/zahirscan/' },
            { text: 'Install', link: '/zahirscan/install' },
            { text: 'CLI', link: '/zahirscan/cli' },
            { text: 'Supported formats', link: '/zahirscan/formats' },
            {
              text: 'Metadata extraction',
              collapsed: false,
              items: metadataNavItems,
            },
            { text: 'Template mining', link: '/zahirscan/templates' },
            { text: 'Writing footprint', link: '/zahirscan/writing-footprint' },
            { text: 'Architecture', link: '/zahirscan/architecture' },
            { text: 'Configuration', link: '/zahirscan/configuration' },
            { text: 'Library', link: '/zahirscan/library' },
            { text: 'UBLX integration', link: '/zahirscan/ublx' },
          ],
        },
      ],
      '/nefaxer/': [
        {
          text: 'Nefaxer',
          items: [
            { text: 'Overview', link: '/nefaxer/' },
            { text: 'Install', link: '/nefaxer/install' },
            { text: 'CLI', link: '/nefaxer/cli' },
            { text: 'Architecture', link: '/nefaxer/architecture' },
            { text: 'Configuration', link: '/nefaxer/configuration' },
            { text: 'Database schema', link: '/nefaxer/database' },
            { text: 'Library', link: '/nefaxer/library' },
            { text: 'UBLX integration', link: '/nefaxer/ublx' },
          ],
        },
      ],
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'FAQ', link: '/guides/faq' },
            { text: 'Snapshot & browse', link: '/guides/snapshot-and-browse' },
            { text: 'Path-only vs full enhance', link: '/guides/path-only-vs-full-enhance' },
            { text: 'Right-pane previews', link: '/guides/right-pane-previews' },
            { text: 'Making & exporting lenses', link: '/guides/lenses' },
            { text: 'Change & duplicates', link: '/guides/change-and-duplicates' },
            { text: 'Built for project trees', link: '/guides/project-trees' },
            { text: 'Enhance policies', link: '/guides/enhance-policies' },
            { text: 'Headless snapshot + export', link: '/guides/headless-snapshot-export' },
            { text: 'Command mode & menus', link: '/guides/command-mode-and-menus' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
      options: {
        async _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          const section = searchSectionLabel(env.relativePath)
          if (!section) return html
          // Prepend an H1 so results show e.g. "UBLX › CLI" vs "Nefaxer › CLI".
          return md.render(`# ${section}`) + html
        },
      },
    },
    footer: {
      message: 'UBLX · Nefaxer · ZahirScan',
      copyright: 'Copyright © 2026 Alexander Hurowitz',
    },
  },
})
