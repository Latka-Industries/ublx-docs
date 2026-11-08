<script setup lang="ts">
import VPSocialLink from 'vitepress/dist/client/theme-default/components/VPSocialLink.vue'
import SiteThemePicker from './SiteThemePicker.vue'
import Separator from './ui/Separator.vue'

const githubUrl = 'https://github.com/Latka-Industries/ublx-docs'
const mailIcon = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>Email</title><path d="M1.5 8.67v8.58A2.25 2.25 0 0 0 3.75 19.5h16.5a2.25 2.25 0 0 0 2.25-2.25V8.67l-8.69 5.43a3 3 0 0 1-3.12 0L1.5 8.67Z"/><path d="M22.5 6.908V6.75a2.25 2.25 0 0 0-2.25-2.25H3.75A2.25 2.25 0 0 0 1.5 6.75v.158l9.44 5.9a1.5 1.5 0 0 0 1.62 0l9.44-5.9Z"/></svg>',
}
</script>

<template>
  <div class="nav-bar-trailing flex items-center">
    <Separator orientation="vertical" class="nav-bar-trailing__sep ml-4 mr-4 h-6" />
    <SiteThemePicker class="site-theme-picker--inline mr-2" />
    <Separator orientation="vertical" class="nav-bar-trailing__sep mx-2 h-6" />
    <VPSocialLink
      class="nav-bar-trailing__social"
      :icon="mailIcon"
      link="mailto:lens@ublx.dev"
      ariaLabel="Email"
    />
    <VPSocialLink
      class="nav-bar-trailing__social nav-bar-trailing__github"
      icon="github"
      :link="githubUrl"
      ariaLabel="ublx-docs on GitHub"
    />
  </div>
</template>
