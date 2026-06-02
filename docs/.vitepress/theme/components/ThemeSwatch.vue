<script setup lang="ts">
import { computed } from 'vue'

type PaletteColors = Record<string, { rgb: number[]; hex: string }>

const props = defineProps<{
  name: string
  colors: PaletteColors
  defaultTheme?: boolean
}>()

const chipDefs = [
  { label: 'Page', colorKey: 'background' },
  { label: 'Text', colorKey: 'text' },
  { label: 'Focus', colorKey: 'focused_border' },
  { label: 'Tab', colorKey: 'tab_active_bg' },
  { label: 'Search', colorKey: 'search_text' },
  { label: 'Hint', colorKey: 'hint' },
  { label: 'Brand', colorKey: 'title_brand' },
] as const

const chips = computed(() =>
  chipDefs.map((c) => ({
    label: c.label,
    hex: props.colors[c.colorKey]?.hex ?? '#888888',
  })),
)

const bg = computed(() => props.colors.background?.hex ?? '#000')
const text = computed(() => props.colors.text?.hex ?? '#fff')
</script>

<template>
  <div class="theme-swatch" :style="{ '--swatch-bg': bg, '--swatch-text': text }">
    <div class="theme-swatch__preview">
      <span v-if="defaultTheme" class="theme-swatch__badge">Default</span>
      <span class="theme-swatch__sample" aria-hidden="true">Aa</span>
    </div>
    <div class="theme-swatch__chips" role="list" aria-label="Palette colors">
      <div
        v-for="chip in chips"
        :key="chip.label"
        class="theme-swatch__chip-wrap"
        role="listitem"
      >
        <span
          class="theme-swatch__chip"
          :title="`${chip.label}: ${chip.hex}`"
          :style="{ backgroundColor: chip.hex }"
        />
        <span class="theme-swatch__chip-label">{{ chip.label }}</span>
      </div>
    </div>
  </div>
</template>
