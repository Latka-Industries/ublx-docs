import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'UBLX',
  description: 'Documentation for UBLX, Nefaxer, and ZahirScan — the Latka Industries catalog stack.',
  base: '/ublx-docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ZahirScan', link: '/zahirscan/' },
      { text: 'Nefaxer', link: '/nefaxer/' },
      { text: 'Guides', link: '/guides/' },
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
          ],
        },
      ],
      '/zahirscan/': [
        {
          text: 'ZahirScan',
          items: [{ text: 'Overview', link: '/zahirscan/' }],
        },
      ],
      '/nefaxer/': [
        {
          text: 'Nefaxer',
          items: [{ text: 'Overview', link: '/nefaxer/' }],
        },
      ],
      '/guides/': [
        {
          text: 'Guides',
          items: [{ text: 'Overview', link: '/guides/' }],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Latka-Industries/ublx-docs' },
    ],
    footer: {
      message: 'Latka Industries',
      copyright: 'Copyright © 2026 Latka Industries',
    },
  },
})
