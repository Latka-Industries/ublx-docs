/** ZahirScan metadata sidebar / nav — keep in sync with `docs/zahirscan/metadata/`. */
export const metadataNavItems = [
  { text: 'Overview', link: '/zahirscan/metadata/' },
  { text: 'Column statistics', link: '/zahirscan/metadata/column-statistics' },
  { text: 'Media', link: '/zahirscan/metadata/media' },
  { text: 'Documents', link: '/zahirscan/metadata/documents' },
  { text: 'Logs & JSON', link: '/zahirscan/metadata/logs-and-json' },
  { text: 'Delimited text', link: '/zahirscan/metadata/delimited' },
  { text: 'Columnar binary', link: '/zahirscan/metadata/columnar' },
  { text: 'Scientific arrays', link: '/zahirscan/metadata/scientific-arrays' },
  { text: 'Python pickle', link: '/zahirscan/metadata/pickle' },
  { text: 'Models', link: '/zahirscan/metadata/models' },
  { text: 'SQLite', link: '/zahirscan/metadata/sqlite' },
  { text: 'Settings & XML', link: '/zahirscan/metadata/settings' },
  { text: 'Code', link: '/zahirscan/metadata/code' },
  { text: 'HTML', link: '/zahirscan/metadata/html' },
  { text: 'Archives', link: '/zahirscan/metadata/archives' },
]

/** Top nav: single link — nested submenu is too tall and hides items below. */
export const metadataNavLink = {
  text: 'Metadata extraction',
  link: '/zahirscan/metadata/',
}
