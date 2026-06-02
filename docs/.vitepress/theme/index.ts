import DefaultTheme from 'vitepress/theme'
import HomeFeatures from './components/HomeFeatures.vue'
import HomeImpls from './components/HomeImpls.vue'
import ThemeGallery from './components/ThemeGallery.vue'
import Layout from './Layout.vue'
import NavBarTrailing from './components/NavBarTrailing.vue'
import { restoreSiteTheme } from './composables/useUblxSiteTheme'
import './shadcn.css'
import './custom.css'
import './themes-gallery.css'
import './site-theme-picker.css'
import './doc-toc-sidebar.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeFeatures', HomeFeatures)
    app.component('HomeImpls', HomeImpls)
    app.component('ThemeGallery', ThemeGallery)
    app.component('NavBarTrailing', NavBarTrailing)
    if (typeof document !== 'undefined') restoreSiteTheme()
  },
}
