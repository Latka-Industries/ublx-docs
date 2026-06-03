import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { docsRsNavItem } from './docs-rs-nav'
import { buildThemeInitScript } from './theme/composables/useUblxSiteTheme'
import { themesNavItem } from './themes-nav'
import { tuiNavItem } from './tui-nav'
import { ublxSidebar } from './ublx-nav'

export default defineConfig({
  title: 'UBLX & Co',
  description: 'Documentation for UBLX, Nefaxer, and ZahirScan — the Latka Industries catalog stack.',
  base: '/',
  appearance: false,
  head: [
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
          { text: 'Metadata extraction', link: '/zahirscan/metadata' },
          {
            text: 'Template mining',
            items: [
              { text: 'Mining overview', link: '/zahirscan/templates/' },
              { text: 'Writing footprint', link: '/zahirscan/templates/writing-footprint' },
              { text: 'Column statistics', link: '/zahirscan/templates/column-statistics' },
            ],
          },
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
            { text: 'Metadata extraction', link: '/zahirscan/metadata' },
            {
              text: 'Template mining',
              collapsed: false,
              items: [
                { text: 'Mining overview', link: '/zahirscan/templates/' },
                { text: 'Writing footprint', link: '/zahirscan/templates/writing-footprint' },
                { text: 'Column statistics', link: '/zahirscan/templates/column-statistics' },
              ],
            },
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
    },
    footer: {
      message: 'UBLX · Nefaxer · ZahirScan',
      copyright: 'Copyright © 2026 Alexander Hurowitz',
    },
  },
})
