import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Quasar, { Cookies } from 'quasar'

const mockSsrContext = () => {
  return {
    req: {
      headers: {}
    },
    res: {
      setHeader: () => undefined
    }
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(Quasar)

export const mountQuasar = (component, options = {}) => {
  const app= {}
  const store = new Vuex.Store({})
  const router = new VueRouter()

  if (options) {
    const ssrContext = options.ssr ? mockSsrContext() : null

    if (options.cookies) {
      const cookieStorage = ssrContext ? Cookies.parseSSR(ssrContext) : Cookies
      const cookies = options.cookies
      Object.keys(cookies).forEach(key => {
        cookieStorage.set(key, cookies[key])
      })
    }

    if (options.plugins) {
      options.plugins.forEach(plugin => {
        plugin({ app, store, router, Vue: localVue, ssrContext })
      })
    }
  }

  return mount(component, {
    localVue: localVue,
    store,
    router,
    i18n: app.i18n,
    // Injections for Components with a QPage root Element
    provide: {
      pageContainer: true,
      layout: {
        header: {},
        right: {},
        footer: {},
        left: {}
      }
    }
  })
}
