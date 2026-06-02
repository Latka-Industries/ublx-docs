import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'UBLX',
  description: 'Documentation for UBLX, Nefaxer, and ZahirScan — the Latka Industries catalog stack.',
  base: '/ublx-docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'UBLX',
        activeMatch: '^/(getting-started|configuration|tui)(\\.html)?$',
        items: [
          { text: 'Getting started', link: '/getting-started' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'TUI & modes', link: '/tui' },
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
        ],
      },
      {
        text: 'Guides',
        activeMatch: '^/guides/',
        items: [
          { text: 'Overview', link: '/guides/' },
          { text: 'Path-only vs full enhance', link: '/guides/path-only-vs-full-enhance' },
          { text: 'Enhance policies', link: '/guides/enhance-policies' },
          { text: 'Headless snapshot + export', link: '/guides/headless-snapshot-export' },
          { text: 'Making & exporting lenses', link: '/guides/lenses' },
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
    ],
    sidebar: {
      '/': [
        {
          text: 'UBLX',
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Getting started', link: '/getting-started' },
            { text: 'Configuration', link: '/configuration' },
            { text: 'TUI & modes', link: '/tui' },
          ],
        },
      ],
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
            { text: 'Path-only vs full enhance', link: '/guides/path-only-vs-full-enhance' },
            { text: 'Enhance policies', link: '/guides/enhance-policies' },
            { text: 'Headless snapshot + export', link: '/guides/headless-snapshot-export' },
            { text: 'Making & exporting lenses', link: '/guides/lenses' },
            { text: 'Command mode & menus', link: '/guides/command-mode-and-menus' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Latka-Industries/ublx-docs' },
    ],
    footer: {
      message: 'UBLX · Nefaxer · ZahirScan',
      copyright: 'Copyright © 2026 Alexander Hurowitz',
    },
  },
})
