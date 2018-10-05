import Vue from 'vue'
import Vuex from 'vuex'

import db from './modules/db'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      db
    }
  })

  return Store
}
