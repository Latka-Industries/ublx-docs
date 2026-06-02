<script setup lang="ts">
import { cn } from '../../lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('relative overflow-hidden', $props.class)">
    <div
      :class="
        cn(
          'scroll-area-viewport size-full max-h-[inherit] overflow-y-auto overflow-x-hidden',
        )
      "
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scroll-area-viewport {
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.35) transparent;
}

.scroll-area-viewport::-webkit-scrollbar {
  width: 6px;
}

.scroll-area-viewport::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background: hsl(var(--muted-foreground) / 0.35);
}

.scroll-area-viewport::-webkit-scrollbar-track {
  background: transparent;
}
</style>
