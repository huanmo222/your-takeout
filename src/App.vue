<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <router-view :seller="seller" :ratings="ratings"/>
  </div>
</template>

<script>
import VHeader from 'components/home/header/Header'
import VTab from 'components/home/tab/Tab'
export default {
  name: 'App',
  data () {
    return {
      // goods: [],
      ratings: [],
      seller: {}
    }
  },
  components: {
    VHeader,
    VTab
  },
  created () {
    this.getInfor()
  },
  methods: {
    getInfor () {
      this.$axios.get('../static/mock/data.json')
        .then(res => {
          let data = res.data
          if (res.status === 200) {
            // this.goods = data.goods
            this.ratings = data.ratings
            this.seller = data.seller
            console.log(this.seller)
          }
        })
    }
  }

}
</script>

<style>

</style>
