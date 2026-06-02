<script setup lang="ts">
import VPSocialLink from 'vitepress/dist/client/theme-default/components/VPSocialLink.vue'
import SiteThemePicker from './SiteThemePicker.vue'

const githubUrl = 'https://github.com/Latka-Industries/ublx-docs'
</script>

<template>
  <div class="nav-bar-trailing">
    <span class="nav-bar-trailing__divider" aria-hidden="true" />
    <SiteThemePicker class="site-theme-picker--inline" />
    <span class="nav-bar-trailing__divider" aria-hidden="true" />
    <VPSocialLink
      class="nav-bar-trailing__github"
      icon="github"
      :link="githubUrl"
      ariaLabel="ublx-docs on GitHub"
    />
  </div>
</template>
