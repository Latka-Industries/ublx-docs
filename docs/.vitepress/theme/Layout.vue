<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import DocTocOutline from './components/DocTocOutline.vue'
import SiteThemePicker from './components/SiteThemePicker.vue'
import { restoreSiteTheme } from './composables/useUblxSiteTheme'

const Layout = DefaultTheme.Layout

onMounted(() => restoreSiteTheme())
</script>

<template>
  <Layout>
    <template #nav-screen-content-before>
      <SiteThemePicker class="site-theme-picker--mobile" />
      <slot name="nav-screen-content-before" />
    </template>
    <template #aside-outline-before>
      <DocTocOutline />
      <slot name="aside-outline-before" />
    </template>
  </Layout>
</template>
