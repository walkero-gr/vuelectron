import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false
  },
  mutations: {
    switchTheme (state, dark) {
      state.dark = dark
    }
  },
  actions: {

  }
})
