<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view :seller="seller" :ratings="ratings"/>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from 'components/home/header/Header'
import VTab from 'components/home/tab/Tab'
// import { urlParse } from 'common/js/until'
export default {
  name: 'App',
  data () {
    return {
      // goods: [],
      ratings: [],
      seller: {},
      id: ''
    }
  },
  components: {
    VHeader,
    VTab
  },
  created () {
    this.getInfor()
    this.getId()
  },
  methods: {
    getId () {
      this.id = this.$route.query.id
    },
    getInfor () { // 实际项目中需要传入相应的商家id获取相应的商家信息
      this.$axios.get('../static/mock/data.json')
        .then(res => {
          let data = res.data
          if (res.status === 200) {
            // this.goods = data.goods
            this.ratings = data.ratings
            // this.seller = data.seller
            this.seller = Object.assign({}, {id: this.id}, data.seller)
            // console.log(this.seller)
          }
        })
    }
  }

}
</script>

<style>

</style>
