<script setup lang="ts">
import { cn } from '../../../lib/utils'

const props = defineProps<{
  href: string
  class?: string
}>()

defineEmits<{ click: [Event] }>()
</script>

<template>
  <a
    :href="href"
    :class="
      cn(
        'outline-link flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-sidebar-foreground/80 outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>span:last-child]:truncate',
        'active:bg-sidebar-accent active:font-medium active:text-sidebar-accent-foreground',
        props.class,
      )
    "
    @click="$emit('click', $event)"
  >
    <slot />
  </a>
</template>
