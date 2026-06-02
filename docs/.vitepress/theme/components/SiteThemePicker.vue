<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useUblxSiteTheme } from '../composables/useUblxSiteTheme'
import PaletteMiniSwatch from './PaletteMiniSwatch.vue'

const {
  selectedName,
  selectedPalette,
  darkThemes,
  lightThemes,
  applyByName,
  stepTheme,
} = useUblxSiteTheme()

const root = ref<HTMLElement | null>(null)
const open = ref(false)

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function pick(name: string) {
  applyByName(name)
  close()
}

function prev() {
  stepTheme(-1)
}

function next() {
  stepTheme(1)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onClickOutside(root, close)

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div
    ref="root"
    class="site-theme-picker"
    title="Site color scheme from UBLX palettes"
  >
    <button
      type="button"
      class="site-theme-picker__step"
      aria-label="Previous palette"
      @click="prev"
    >
      <span class="vpi-chevron-left" aria-hidden="true" />
    </button>

    <div class="site-theme-picker__menu" :class="{ 'is-open': open }">
      <button
        type="button"
        id="ublx-site-theme-trigger"
        class="site-theme-picker__trigger"
        aria-haspopup="listbox"
        :aria-expanded="open"
        aria-label="Choose UBLX palette for site colors"
        @click="toggle"
      >
        <PaletteMiniSwatch
          v-if="selectedPalette"
          :palette="selectedPalette"
        />
        <span class="site-theme-picker__name">{{ selectedName }}</span>
        <span class="site-theme-picker__chevron vpi-chevron-down" aria-hidden="true" />
      </button>

      <div
        v-show="open"
        class="site-theme-picker__panel"
        role="listbox"
        aria-labelledby="ublx-site-theme-trigger"
      >
        <div class="site-theme-picker__group">
          <div class="site-theme-picker__group-label">Dark</div>
          <button
            v-for="theme in darkThemes"
            :key="theme.name"
            type="button"
            class="site-theme-picker__option"
            :class="{ 'is-active': theme.name === selectedName }"
            role="option"
            :aria-selected="theme.name === selectedName"
            @click="pick(theme.name)"
          >
            <PaletteMiniSwatch :palette="theme" size="md" />
            <span class="site-theme-picker__option-name">{{ theme.name }}</span>
          </button>
        </div>

        <div class="site-theme-picker__group">
          <div class="site-theme-picker__group-label">Light</div>
          <button
            v-for="theme in lightThemes"
            :key="theme.name"
            type="button"
            class="site-theme-picker__option"
            :class="{ 'is-active': theme.name === selectedName }"
            role="option"
            :aria-selected="theme.name === selectedName"
            @click="pick(theme.name)"
          >
            <PaletteMiniSwatch :palette="theme" size="md" />
            <span class="site-theme-picker__option-name">{{ theme.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="site-theme-picker__step"
      aria-label="Next palette"
      @click="next"
    >
      <span class="vpi-chevron-right" aria-hidden="true" />
    </button>
  </div>
</template>
