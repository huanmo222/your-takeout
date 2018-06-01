<!-- Tab -->
<template>
  <div class="tab border-1px">
    <router-link to="/goods" tag="div" class="tab-item">商品</router-link>
    <router-link to="/ratings" tag="div" class="tab-item">评价</router-link>
    <router-link to="/seller" tag="div" class="tab-item">商家</router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
  .tab
    display flex
    width 100%
    height .8rem
    line-height .8rem
    .tab-item
      flex 1
      font-size $FontSize-l
      text-align center
      color rgb(77,85,93)
      border-1px(rgba(7,17,27,0.1))
      &.active
        color rgb(240,20,20)

</style>
