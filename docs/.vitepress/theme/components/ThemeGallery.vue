<script setup lang="ts">
import paletteData from '../data/themes-palettes.json'
import ThemeSwatch from './ThemeSwatch.vue'
import { themeAnchor } from '../../themes-nav'

type ThemeEntry = (typeof paletteData.dark)[number]

const descriptions: Record<string, string> = {
  'Archival Simulacra':
    'True black page, neon green body text, bright green focus and tabs, dim emerald hints — matrix-style.',
  'Babel Blend':
    'Deep navy page, warm parchment body text, orange focus/search, brick-red active tabs, coral hints.',
  'Burning Glyph':
    'Maroon-black page, pale buttery text, coral-red focus and search, amber brand.',
  'Frozen Phrase':
    'Nordic blue-gray page, snow text, frost-blue focus, ice-pale active tabs, sea-glass search, muted hints.',
  'Garden Unseen':
    'Deep forest-green page, peach-cream text, mint focus and search, olive-brown brand.',
  'Golden Delirium':
    'Olive-black page, soft pink/cream text, yellow-lime focus and search, rust-brown brand.',
  'Oblivion Ink':
    'Deep navy page, pale aqua text, cyan focus and search, magenta hints and brand.',
  'Purple Haze':
    'Near-black violet page, lavender-rose text, magenta focus and search, violet brand.',
  'Resin Record':
    'Near-black page, warm amber body text, amber focus/search — compact “CRT” feel.',
  'Shadow Index':
    'Near-black page, cool off-white text, medium-gray focus, hints with a slight blue-gray cast.',
  'Tangerine Memory':
    'Burnt umber page, honey-cream text, peach-gold focus and search, dusty rose brand.',
  'Asterion Code':
    'Cool blue-gray page, blue-forward body text, teal focus, warm clay hints.',
  'Barley Bound':
    'Buttercream page, warm dark body text, teal focus, olive search, orange brand (Gruvbox-light–style).',
  'Cryptic Chai':
    'Tea-stained parchment, dark chocolate text, copper-brown focus and tabs, muted hints.',
  'Faded Echo': 'Dusty sepia paper, book-ink text, copper-brown accents, archival calm.',
  'Infinite Rose':
    'Pale cool-gray page, rose/mauve body text and chrome, dusty hints.',
  'Obdurate Noon':
    'Solarized-light–style parchment, muted blue-gray text, cyan focus, blue tabs/search, violet hints.',
  'Ochre Thread':
    'Pale sand page, burnt-orange text, copper focus and rust tabs, blue-gray hints.',
  'Pale Mirror':
    'Frosted blue-lilac page, plum body text, purple tab/focus chrome, rose-mauve hints.',
  'Parched Page':
    'Warm cream page, forest-green text and green tab chrome, amber-brown hints.',
  'Silent Sheet':
    'White page, black text, charcoal focus, slate-blue active tabs, warm gray hints.',
  'Verglas Trace':
    'Snow page, polar-night body text, frost-blue focus/search, slate tabs (Nord-light–style).',
}

function desc(theme: ThemeEntry) {
  return descriptions[theme.name] ?? ''
}
</script>

<template>
  <section class="theme-gallery">
    <h2 id="dark-themes">Dark themes</h2>
    <div class="theme-gallery__grid">
      <article
        v-for="theme in paletteData.dark"
        :id="themeAnchor(theme.name)"
        :key="theme.name"
        class="theme-gallery__card"
      >
        <ThemeSwatch
          :name="theme.name"
          :colors="theme.colors"
          :default-theme="theme.name === 'Oblivion Ink'"
        />
        <div class="theme-gallery__body">
          <p class="theme-gallery__title">{{ theme.name }}</p>
          <p class="theme-gallery__desc">{{ desc(theme) }}</p>
        </div>
        <pre class="theme-gallery__toml"><code>theme = "{{ theme.name }}"</code></pre>
      </article>
    </div>

    <h2 id="light-themes">Light themes</h2>
    <div class="theme-gallery__grid">
      <article
        v-for="theme in paletteData.light"
        :id="themeAnchor(theme.name)"
        :key="theme.name"
        class="theme-gallery__card"
      >
        <ThemeSwatch :name="theme.name" :colors="theme.colors" />
        <div class="theme-gallery__body">
          <p class="theme-gallery__title">{{ theme.name }}</p>
          <p class="theme-gallery__desc">{{ desc(theme) }}</p>
        </div>
        <pre class="theme-gallery__toml"><code>theme = "{{ theme.name }}"</code></pre>
      </article>
    </div>

    <p class="theme-gallery__legend">
      Swatches: <strong>Page</strong> (background) · <strong>Text</strong> · <strong>Focus</strong> ·
      <strong>Tab</strong> · <strong>Search</strong> · <strong>Hint</strong> · <strong>Brand</strong> — from
      <a href="https://github.com/Latka-Industries/UBLX/blob/main/src/themes/palettes.rs">UBLX palettes.rs</a>.
    </p>
  </section>
</template>
