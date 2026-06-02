<script setup lang="ts">
import { onContentUpdated } from 'vitepress'
import { ref, shallowRef } from 'vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js'
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
} from 'vitepress/dist/client/theme-default/composables/outline.js'
import DocTocOutlineItem from './DocTocOutlineItem.vue'
import SidebarGroup from './ui/sidebar/SidebarGroup.vue'
import SidebarGroupContent from './ui/sidebar/SidebarGroupContent.vue'
import SidebarGroupLabel from './ui/sidebar/SidebarGroupLabel.vue'
import SidebarMenu from './ui/sidebar/SidebarMenu.vue'

const { frontmatter, theme } = useData()

const headers = shallowRef<Awaited<ReturnType<typeof getHeaders>>>([])

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

const container = ref<HTMLElement | null>(null)
const marker = ref<HTMLElement | null>(null)

useActiveAnchor(container, marker)
</script>

<template>
  <nav
    v-show="headers.length > 0"
    ref="container"
    aria-labelledby="doc-outline-aria-label"
    class="doc-toc-sidebar"
  >
    <SidebarGroup class="p-0">
      <SidebarGroupLabel
        id="doc-outline-aria-label"
        class="h-8 px-0 text-sm font-semibold text-sidebar-foreground"
        role="heading"
        aria-level="2"
      >
        {{ resolveTitle(theme) }}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div class="doc-toc-sidebar__track">
          <div ref="marker" class="doc-toc-sidebar__marker" />
          <SidebarMenu>
            <DocTocOutlineItem :headers="headers" />
          </SidebarMenu>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  </nav>
</template>
