<script setup lang="ts">
import VPSocialLink from 'vitepress/dist/client/theme-default/components/VPSocialLink.vue'
import SiteThemePicker from './SiteThemePicker.vue'
import Separator from './ui/Separator.vue'

const githubUrl = 'https://github.com/Latka-Industries/ublx-docs'
</script>

<template>
  <div class="nav-bar-trailing flex items-center">
    <Separator orientation="vertical" class="ml-4 mr-4 h-6" />
    <SiteThemePicker class="site-theme-picker--inline mr-2" />
    <Separator orientation="vertical" class="mx-2 h-6" />
    <VPSocialLink
      class="nav-bar-trailing__github"
      icon="github"
      :link="githubUrl"
      ariaLabel="ublx-docs on GitHub"
    />
  </div>
</template>
