import Vue from 'vue'
import Vuex from 'vuex'
import balls from './moudles/balls'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    balls
  }
})

export default store
