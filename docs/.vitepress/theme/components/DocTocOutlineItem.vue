<script setup lang="ts">
import type { MenuItem } from 'vitepress/dist/client/theme-default/composables/outline.js'
import SidebarMenuButton from './ui/sidebar/SidebarMenuButton.vue'
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue'
import SidebarMenuSub from './ui/sidebar/SidebarMenuSub.vue'
import SidebarMenuSubButton from './ui/sidebar/SidebarMenuSubButton.vue'

defineProps<{
  headers: MenuItem[]
  nested?: boolean
}>()

function onClick({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })
}
</script>

<template>
  <template v-if="nested">
    <li v-for="header in headers" :key="header.link">
      <SidebarMenuSubButton :href="header.link" @click="onClick">
        <span>{{ header.title }}</span>
      </SidebarMenuSubButton>
      <SidebarMenuSub v-if="header.children?.length">
        <DocTocOutlineItem :headers="header.children" nested />
      </SidebarMenuSub>
    </li>
  </template>

  <template v-else>
    <SidebarMenuItem v-for="header in headers" :key="header.link">
      <SidebarMenuButton :href="header.link" @click="onClick">
        <span>{{ header.title }}</span>
      </SidebarMenuButton>
      <SidebarMenuSub v-if="header.children?.length">
        <DocTocOutlineItem :headers="header.children" nested />
      </SidebarMenuSub>
    </SidebarMenuItem>
  </template>
</template>
