<template lang="pug">
  q-layout(view="lHh Lpr lFf", reveal)
    q-layout-header
      q-toolbar.row.header-gradient()
        q-toolbar-title.col
          img(src="statics/eftg_fullLogo.png" height="64px" style="margin-bottom:-6px")
        q-btn(round flat icon="fas fa-cloud" :color="getLinkStatus()")
          q-item(v-if="hover")
            q-chip(v-if="uplink", floating, detail, pointing="up" color="positive", text-color="#000") {{ $t('interface.online') }}
            q-chip(v-else, floating, detail, pointing="up", color="negative", text-color="#000")  {{ $t('interface.offline') }}
        q-btn(round, flat, icon="fas fa-cog")

        q-btn-dropdown(ref="selectLanguages", v-if="hasMultipleLanguages", icon="language", :label="currentLanguage.code", flat, dense)
          q-list(link)
            q-item(v-close-overlay, v-for="(language, index) in availableLanguages", :key="index", @click.native="setLanguage(language.code)")
              q-item-main
                q-item-tile(label) {{ language.name }}
              q-item-side(v-if="language.code === currentLanguage.code", right, icon="done", color="primary")
        q-btn(@click="rightDrawerOpen = !rightDrawerOpen") PDF
    q-layout-drawer(
    :width="250"
    side="right"
    no-hide-on-route-change
    v-model="rightDrawerOpen"
    )
      q-scroll-area(
      style="height:100%"
      :thumb-style="{right:'2px',width:'4px'}"
      )
        q-item PDF PREVIEW
    q-page-container.bg-background
      router-view
</template>
<style>
</style>
<script>
import { mixin as i18nMixin } from '@/plugins/i18n'

export default {
  name: 'MainLayout',
  mixins: [i18nMixin],
  data () {
    return {
      rightDrawerOpen: false,
      uplink: false,
      hover: false
    }
  },
  methods: {
    getLinkStatus () {
      return this.uplink ? 'positive' : 'negative'
    }
  }
}
</script>
