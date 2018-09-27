import VueI18n from 'vue-i18n'
import { Cookies } from 'quasar'
import { mapActions } from 'vuex'

import config from '@/config'
import messages from '@/i18n'

export default ({ app, store, Vue, ssrContext }) => {
  Vue.use(VueI18n)

  const cookies = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies
  const currentLocale = cookies.get('locale') || config.i18n.default
  // todo: check that the cookie REALLY exists
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: currentLocale,
    fallbackLocale: 'en',
    messages
  })

  store.registerModule('i18n', {
    state: {
      locale: currentLocale
    },
    getters: {
      getLocale: state => state.locale
    },
    mutations: {
      setLocale (state, code) {
        state.locale = code
      }
    },
    actions: {
      setLanguage ({ commit }, code) {
        cookies.set('locale', code)
        commit('setLocale', code)
        app.i18n.locale = code
      }
    }
  })
}

export let mixin = {
  data () {
    return {
      hasMultipleLanguages: config.i18n.languages.filter(l => l.active).length > 1
    }
  },
  computed: {
    currentLanguage () {
      return config.i18n.languages.find(l => l.code === this.$store.getters.getLocale)
    },
    availableLanguages () {
      return [this.currentLanguage].concat(config.i18n.languages.filter(l => l !== this.currentLanguage && l.active))
    }
  },
  methods: {
    ...mapActions(['setLanguage'])
  }
}
