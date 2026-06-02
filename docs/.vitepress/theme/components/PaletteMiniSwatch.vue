<script setup lang="ts">
import type { PaletteEntry } from '../utils/palette-to-vp'

defineProps<{
  palette: PaletteEntry
  size?: 'sm' | 'md'
}>()

const accentKeys = ['focused_border', 'tab_active_bg', 'title_brand', 'hint'] as const
</script>

<template>
  <span
    class="palette-mini-swatch"
    :class="size === 'md' ? 'palette-mini-swatch--md' : 'palette-mini-swatch--sm'"
    :style="{ '--swatch-bg': palette.colors.background?.hex ?? '#000' }"
    aria-hidden="true"
  >
    <span class="palette-mini-swatch__dots">
      <span
        v-for="key in accentKeys"
        :key="key"
        class="palette-mini-swatch__dot"
        :style="{ backgroundColor: palette.colors[key]?.hex ?? '#888' }"
      />
    </span>
  </span>
</template>
