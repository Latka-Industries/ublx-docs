import type { DefaultTheme } from 'vitepress/theme'

/** Title + one-line description. VitePress renders `text` with v-html. */
function navCard(title: string, desc: string): string {
  return `<span class="nav-mega__card"><span class="nav-mega__title">${title}</span><span class="nav-mega__desc">${desc}</span></span>`
}

export function navLink(
  title: string,
  desc: string,
  link: string,
  activeMatch?: string,
): DefaultTheme.NavItemWithLink {
  return {
    text: navCard(title, desc),
    link,
    ...(activeMatch ? { activeMatch } : {}),
  }
}
