<script setup lang="ts">
import { inject } from 'vue'
import { dropdownMenuKey } from './dropdown-menu'

const ctx = inject(dropdownMenuKey)
if (!ctx) throw new Error('DropdownMenuTrigger must be used within DropdownMenu')

defineProps<{
  id?: string
  ariaLabel?: string
}>()
</script>

<template>
  <button
    :id="id"
    type="button"
    class="site-theme-picker__dropdown-trigger"
    :aria-label="ariaLabel"
    :aria-expanded="ctx.open.value"
    aria-haspopup="menu"
    @click="ctx.toggle()"
  >
    <slot />
  </button>
</template>
