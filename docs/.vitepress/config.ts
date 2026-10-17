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
  const path = relativePath.replace(/\\/g, '/')
  if (path === 'index.md') return undefined
  if (path.startsWith('zahirscan/')) return 'ZahirScan'
  if (path.startsWith('nefaxer/')) return 'Nefaxer'
  if (path.startsWith('guides/')) return 'Guides'
  return 'UBLX'
}

function searchSectionLabelFromFile(file: string): string | undefined {
  const norm = file.replace(/\\/g, '/')
  const marker = '/docs/'
  const idx = norm.lastIndexOf(marker)
  const relativePath = idx >= 0 ? norm.slice(idx + marker.length) : norm
  return searchSectionLabel(relativePath)
}

// Mirrors VitePress local-search heading split so we can prepend a product label.
const headingRegex = /<h(\d*).*?>(.*?<a.*? href="#.*?".*?>.*?<\/a>)<\/h\1>/gi
const headingContentRegex = /(.*?)<a.*? href="#(.*?)".*?>.*?<\/a>/i

function clearHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

function* splitPageIntoSections(html: string) {
  const result = html.split(headingRegex)
  result.shift()
  let parentTitles: string[] = []
  for (let i = 0; i < result.length; i += 3) {
    const level = parseInt(result[i]!, 10) - 1
    const heading = result[i + 1]!
    const headingResult = headingContentRegex.exec(heading)
    const title = clearHtmlTags(headingResult?.[1] ?? '').trim()
    const anchor = headingResult?.[2] ?? ''
    const content = result[i + 2]!
    if (!title || !content) continue
    let titles = parentTitles.slice(0, level)
    titles[level] = title
    titles = titles.filter(Boolean)
    yield { anchor, titles, text: clearHtmlTags(content) }
    if (level === 0) {
      parentTitles = [title]
    } else {
      parentTitles[level] = title
    }
  }
}

const SITE_URL = 'https://ublx.dev'
const SITE_TITLE = 'UBLX & Co'
const SITE_DESCRIPTION =
  'Documentation for UBLX, Nefaxer, and ZahirScan — the Latka Industries catalog stack.'
const OG_IMAGE = `${SITE_URL}/og.png`

export default defineConfig({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
    ['meta', { property: 'og:url', content: `${SITE_URL}/` }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: `${SITE_TITLE} documentation` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: OG_IMAGE }],
    ['meta', { name: 'twitter:image:alt', content: `${SITE_TITLE} documentation` }],
  ],
  transformPageData(pageData) {
    const title = pageData.title
      ? `${pageData.title} | ${SITE_TITLE}`
      : SITE_TITLE
    const description = pageData.description || SITE_DESCRIPTION
    const path = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const url = path ? `${SITE_URL}/${path}` : `${SITE_URL}/`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },
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
        // Custom _render must honor search: false itself.
        async _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          return html
        },
        miniSearch: {
          // Prepend product so results show "UBLX › CLI" vs "Nefaxer › CLI".
          *_splitIntoSections(file: string, html: string) {
            const section = searchSectionLabelFromFile(file)
            for (const part of splitPageIntoSections(html)) {
              yield section ? { ...part, titles: [section, ...part.titles] } : part
            }
          },
        },
      },
    },
    footer: {
      message: 'UBLX · Nefaxer · ZahirScan',
      copyright: 'Copyright © 2026 Alexander Hurowitz',
    },
  },
})
