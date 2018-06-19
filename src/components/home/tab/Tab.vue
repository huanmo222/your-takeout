<!-- Tab -->
<template>
  <div class="tab border-1px">
    <transition name="goods-button">
      <router-link to="/goods" tag="div" class="tab-item">点餐</router-link>
    </transition>
    <transition name="ratings-button">
      <router-link to="/ratings" tag="div" class="tab-item">评价</router-link>
    </transition>
    <transition name="seller-button">
      <router-link to="/seller" tag="div" class="tab-item">商家</router-link>
    </transition>
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
      &:active
        background rgba(7,17,27,0.1)
      &.active
        color rgb(240,20,20)
      &.fold-enter, &.fold-leave-to
        transform translate3d(0, 100%, 0)
      &.fold-enter-to, &.fold-leave
        transform translate3d(0, 0, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s ease-out

</style>
