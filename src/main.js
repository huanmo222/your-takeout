// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './stroe'
import 'babel-polyfill'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

// 此项目比较简单, 不做封装了,直接在这里引入使用
Vue.prototype.$axios = axios

// 单独配置的规则
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
