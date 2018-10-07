<template lang="pug">
  q-layout(view="lHh Lpr lFf", reveal)
    q-layout-header
      q-toolbar.row.justify.header-gradient()
        q-toolbar-title.col.col-xs-6
          img(src="statics/EFTG_logo.png" style="padding-top: 4px")
        q-field.col
          .float-right
            q-btn.animate-fade(round size="md" v-if="!showSearch" flat @click="focus()" icon="fas fa-search" ref="searchBtn" style="margin-top:-6px")
            q-search.animate-fade(
            autofocus
            ref="searchField"
            v-if="showSearch"
            dense
            inverted
            color="none"
            v-model="searcher"
            :placeholder="$t('interface.searchTitle.input.name.hint')"
            @change="val => search(val)"
            @blur="unfocus()"
            style="border-radius:22px 5px 5px 22px"
              )
        .float-right
          q-btn(round flat icon="fas fa-user" :color="getLinkStatus()" @click="actionSheet = true")
        .float-right
          // q-btn(round flat icon="fas fa-cloud" :color="getLinkStatus()")
            q-item(v-if="hover")
              q-chip(v-if="uplink", floating, detail, pointing="up" color="positive", text-color="#000") {{ $t('interface.online') }}
              q-chip(v-else, floating, detail, pointing="up", color="negative", text-color="#000")  {{ $t('interface.offline') }}
          // q-btn(round, flat, icon="fas fa-cog")
          q-btn-dropdown(ref="selectLanguages", v-if="hasMultipleLanguages", icon="language", :label="currentLanguage.code", flat)
            q-list(link)
              q-item(v-close-overlay, v-for="(language, index) in availableLanguages", :key="index", @click.native="setLanguage(language.code)")
                q-item-main
                  q-item-tile(label) {{ language.name }}
                q-item-side(v-if="language.code === currentLanguage.code", right, icon="done", color="primary")
    q-dialog.bg-blue-grey-4(
    color="success"
    v-model="actionSheet"
    :title="$t('interface.account')"
    position="top"
    :actions="loginActions"
    style="margin-top:55px; z-index:10"
    )
      div(slot="body")
        q-field(
        icon="account_circle"
        :helper="$t('interface.userNameHelper')"
        :label="$t('interface.userName')"
        :label-width="3"
        )
          q-input(
          v-model="name"
          )
        q-field(
        icon="lock"
        :helper="$t('interface.passwordHelper')"
        :label="$t('interface.password')"
        :label-width="3"
        )
          q-input(
          type="password"
          v-model="name"
          )
    q-layout-drawer(
    :width="250"
    side="left"
    no-hide-on-route-change
    v-model="leftDrawerOpen"
    )
      q-scroll-area(
      style="height:100%"
      :thumb-style="{right:'2px',width:'4px'}"
      )

        q-no-ssr.bg-grey-3
          // printing seems to be currently broken with vue-pdf
          // q-btn(@click="$refs.pdfViewer.print($refs.pdfViewer)") print
          .row.bg-secondary.full-width.fixed(style="z-index:1000")
            q-btn.q-ma-sm.col-6(icon="fas fa-cloud-download-alt" size="sm" dense color="grey-5" text-color="black" @click="download('/statics/pdf/tkb_2017_12_menesu_parskats_eng_revidets.pdf')") &nbsp;{{ $t('interface.downloadPdf') }}
            .col-4
            q-field.col-1.float-right
              q-btn(round flat size="sm" text-color="white" icon="close" style="margin:-3px 0 0 -6px" @click="$root.$emit('closeLeftDrawer')")
          div(style="padding-top:38px")
            pdf(
            ref="pdfViewer"
            :src="src"
            v-for="i in numPages"
            :key="i"
            :page="i"
            style="padding:3px"
            @link-clicked="page = $event"
            )
              div(v-html="i")
    q-layout-drawer.bg-grey-3(
    side="right"
    overlay
    no-hide-on-route-change
    v-model="rightDrawerOpen"
    :content-style="{background: '#eee!important'}"
    )
      q-scroll-area(
      style="height:100%"
      :thumb-style="{right:'2px',width:'4px'}"
      )
        q-no-ssr.full-height
          .row.bg-info.full-width.fixed(style="z-index:1000")
            strong.col-10.q-ma-sm {{ $t('interface.filterResults') }}
            q-field.col-auto.float-right
              q-btn(round flat size="sm" text-color="white" icon="close" style="margin:-3px 0 0 -6px" @click="$root.$emit('closeRightDrawer')")
          div(style="padding-top:52px")
            q-collapsible(
            popup
            group="filterGroup"
            :label="$t('interface.selectDocs.meta.label')"
            )
              q-input.full-width(
              color="secondary"
              :placeholder="$t('interface.selectDocs.input.name.label')"
              v-model="tickFilter"
              class="q-ma-none"
              clearable
              )
              q-tree(
              style="font-size: 0.8em"
              :nodes="tickable"
              color="secondary"
              default-expand-all
              :ticked.sync="ticked"
              tick-strategy="leaf-filtered"
              :filter="tickFilter"
              node-key="label"
              )
            q-collapsible(popup group="filterGroup" :label="$t('interface.financialYear.meta.label')")
              q-tree(
              style="font-size: 0.8em"
              :nodes="years"
              color="secondary"
              default-expand-all
              :ticked.sync="tickedYear"
              tick-strategy="leaf"
              node-key="label"
              )
            q-collapsible(
            popup
            group="filterGroup"
            :label="$t('interface.disclosureDate.meta.label')"
            )
              q-datetime.col(
              minimal
              type="date"
              default-view="year"
              format="DD/MM/YYYY"
              min="1970"
              max="2018"
              hide-underline
              :before="[{icon: 'fas fa-calendar-alt'}]"
              :float-label="$t('interface.disclosureDate.dateFrom.label')"
              :placeholder="$t('interface.disclosureDate.dateFrom.hint')"
              v-model="dateFrom"
              )
              q-datetime.col(
              minimal
              type="date"
              default-view="year"
              format="DD/MM/YYYY"
              min="1970"
              max="2018"
              hide-underline
              :before="[{icon: 'fas fa-calendar-alt'}]"
              :float-label="$t('interface.disclosureDate.dateTo.label')"
              :placeholder="$t('interface.disclosureDate.dateTo.hint')"
              v-model="dateTo"
              )
    q-page-container.bg-background
      transition(
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      :duration="200"
      )
        router-view
</template>
<style>
</style>
<script>
import { mixin as i18nMixin } from '@/plugins/i18n'
import pdf from 'vue-pdf'
let loadingTask

export default {
  name: 'MainLayout',
  mixins: [i18nMixin],
  components: {
    pdf
  },
  data () {
    return {
      loginActions: [
        {
          label: 'Delete',
          icon: 'delete',
          color: 'red'// ,
          // handler: deleteAction
        },
        {
          label: 'Share',
          icon: 'share',
          color: 'primary'
        },

        // optional separator
        {},

        // continuing with other actions
        {
          label: 'Play',
          icon: 'gamepad'
        },
        {
          label: 'Favorite',
          icon: 'favorite'
        }
      ],
      actionSheet: false,
      dateFrom: '1970/01/01',
      dateTo: new Date(),
      showSearch: false,
      searcher: undefined,
      leftDrawerOpen: false,
      rightDrawerOpen: true,
      uplink: false,
      hover: false,
      src: undefined,
      numPages: undefined,
      ticked: ['1.1 annual financial report', '2.1 home member state'],
      tickedYear: ['2017', '2016', '2015', '2014', '2013'],
      tickFilter: null,
      tickable: [
        {
          label: 'select all document classes and sub-classes',
          children: [
            {
              label: '1. Periodic regulated information',
              children: [
                { label: '1.1 annual financial report' },
                { label: '1.2 half-year financial report' },
                { label: '1.3 interim management statement' }
              ]
            },
            {
              label: '2. Ongoing regulated information\'',
              children: [
                { label: '2.1 home member state' },
                { label: '2.2 inside information' }
              ]
            }
          ]
        }
      ],
      years: [
        { label: '2017' },
        { label: '2016' },
        { label: '2015' },
        { label: '2014' },
        { label: '2013' }
      ]
    }
  },
  methods: {
    getLinkStatus () {
      return this.uplink ? 'positive' : 'negative'
    },
    download (url) {
      window.open(url)
    },
    search (val) {
      this.$q.notify(`Searching all records for: "${val}"`)
    },
    focus () {
      this.showSearch = !this.showSearch
    },
    unfocus () {
      this.showSearch = !this.showSearch
    }
  },
  mounted () {
    this.$root.$on('openLeftDrawer', () => {
      this.leftDrawerOpen = true
    })
    this.$root.$on('closeLeftDrawer', () => {
      this.leftDrawerOpen = false
    })
    this.$root.$on('openRightDrawer', () => {
      this.rightDrawerOpen = true
    })
    this.$root.$on('closeRightDrawer', () => {
      this.rightDrawerOpen = false
    })
    this.$root.$on('openActionSheet', () => {
      this.actionSheet = true
    })
    if (typeof window !== 'undefined') {
      loadingTask = pdf.createLoadingTask('statics/pdf/tkb_2017_12_menesu_parskats_eng_revidets.pdf')
    } else {
      loadingTask = ''
    }
    this.src = loadingTask
    this.src.then(pdf => {
      this.numPages = pdf.numPages
    })
  }
}
</script>
