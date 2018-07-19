<!-- v-title -->
<template>
  <div class="v-title">
    <h1 class="title" v-show="title">{{title}}</h1>
    <div class="content">
      <slot></slot>
    </div>
    <!-- <p class="content">{{seller.bulletin}}</p> -->
  </div>
</template>

<script>
export default {
  name: 'VTitle',
  props: {
    title: String
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='stylus' scoped>
  .v-title
    padding .36rem .36rem 0
    .title
      line-height .28rem
      margin-bottom .16rem
      font-size .28rem
      font-weight 700
      color: rgb(7, 17, 27)
</style>
