<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Check, ChevronDown, ChevronLeft, ChevronRight, Shuffle } from '@lucide/vue'
import { useUblxSiteTheme } from '../composables/useUblxSiteTheme'
import PaletteMiniSwatch from './PaletteMiniSwatch.vue'
import Button from './ui/Button.vue'
import DropdownMenu from './ui/DropdownMenu.vue'
import DropdownMenuContent from './ui/DropdownMenuContent.vue'
import DropdownMenuItem from './ui/DropdownMenuItem.vue'
import DropdownMenuLabel from './ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from './ui/DropdownMenuSeparator.vue'
import DropdownMenuTrigger from './ui/DropdownMenuTrigger.vue'

const {
  selectedName,
  selectedPalette,
  darkThemes,
  lightThemes,
  applyByName,
  stepTheme,
  shuffleTheme,
  restore: restoreSiteTheme,
} = useUblxSiteTheme()

const dropdownRef = ref<{ close: () => void } | null>(null)

function pick(name: string) {
  applyByName(name)
  dropdownRef.value?.close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') dropdownRef.value?.close()
}

onMounted(() => {
  restoreSiteTheme()
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div
    class="site-theme-picker flex items-center gap-1"
    title="Site color scheme from UBLX palettes"
  >
    <Button
      variant="outline"
      size="icon"
      aria-label="Previous palette"
      @click="stepTheme(-1)"
    >
      <ChevronLeft class="size-3.5" aria-hidden="true" />
    </Button>

    <DropdownMenu ref="dropdownRef" class="site-theme-picker__dropdown">
      <DropdownMenuTrigger
        id="ublx-site-theme-trigger"
        aria-label="Choose UBLX palette for site colors"
      >
        <PaletteMiniSwatch
          v-if="selectedPalette"
          :key="selectedName"
          :palette="selectedPalette"
        />
        <span class="site-theme-picker__dropdown-label">{{ selectedName }}</span>
        <ChevronDown class="site-theme-picker__dropdown-chevron" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent class="site-theme-picker__dropdown-panel">
        <DropdownMenuLabel>Dark</DropdownMenuLabel>
        <DropdownMenuItem
          v-for="theme in darkThemes"
          :key="theme.name"
          :active="theme.name === selectedName"
          @click="pick(theme.name)"
        >
          <PaletteMiniSwatch :palette="theme" size="md" />
          <span class="site-theme-picker__menu-item-name">{{ theme.name }}</span>
          <Check
            v-if="theme.name === selectedName"
            class="size-3.5 shrink-0 text-primary"
            aria-hidden="true"
          />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Light</DropdownMenuLabel>
        <DropdownMenuItem
          v-for="theme in lightThemes"
          :key="theme.name"
          :active="theme.name === selectedName"
          @click="pick(theme.name)"
        >
          <PaletteMiniSwatch :palette="theme" size="md" />
          <span class="site-theme-picker__menu-item-name">{{ theme.name }}</span>
          <Check
            v-if="theme.name === selectedName"
            class="size-3.5 shrink-0 text-primary"
            aria-hidden="true"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      variant="outline"
      size="icon"
      aria-label="Next palette"
      @click="stepTheme(1)"
    >
      <ChevronRight class="size-3.5" aria-hidden="true" />
    </Button>

    <Button
      variant="outline"
      size="icon"
      aria-label="Random palette"
      @click="shuffleTheme()"
    >
      <Shuffle class="size-3.5" aria-hidden="true" />
    </Button>
  </div>
</template>
