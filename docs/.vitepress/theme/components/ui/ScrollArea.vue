<script setup lang="ts">
import { cn } from '../../lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <div :class="cn('relative overflow-hidden', $props.class)">
    <div
      :class="
        cn(
          'scroll-area-viewport size-full max-h-[inherit] overflow-auto',
        )
      "
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scroll-area-viewport {
  scrollbar-gutter: stable both-edges;
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.45) hsl(var(--muted) / 0.65);
}

.scroll-area-viewport::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scroll-area-viewport::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background: hsl(var(--muted-foreground) / 0.45);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.scroll-area-viewport::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.6);
  background-clip: padding-box;
}

.scroll-area-viewport::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.65);
  border-radius: 9999px;
}

.scroll-area-viewport::-webkit-scrollbar-corner {
  background: hsl(var(--muted) / 0.65);
}
</style>
