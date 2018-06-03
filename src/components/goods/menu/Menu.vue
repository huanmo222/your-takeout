<!-- Goods -->
<template>
  <div class="menu-wrapper" ref="menu">
    <ul>
      <li class="menu-item" v-for="(item, index) in goods" :class="{'current': currentMenuIndex == index}" :key="index" @click="handleMenuClick(index, $event)" :ref="'menu' + index">
        <span class="text border-1px">
          <span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>{{item.name}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Goods',
  props: {
    goods: {
      type: Array
    },
    currentIndex: {
      type: Number
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      currentMenuIndex: this.currentIndex
    }
  },
  watch: {
    currentIndex () {
      this.currentMenuIndex = this.currentIndex
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menu, {click: true})
    },
    handleMenuClick (index, event) {
      // console.log('menu')
      this.$emit('handleMenuClick', index)
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .menu-wrapper
    flex 0 0 1.6rem
    width 1.6rem
    background #f3f5f7
    .menu-item
      display table
      padding 0 .24rem
      width 1.12rem
      height 1.08rem
      line-height 0.28rem
      &.current
        position relative
        z-index 10
        top -.02rem
        background #fff
        .text
          color rgb(7, 17, 27)
          font-weight 700
          border-none()
      .text
        display table-cell
        vertical-align middle
        width 1.12rem
        font-size .24rem
        color rgb(20, 20, 20)
        border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display inline-block
          vertical-align top
          margin-right .04rem
          width .24rem
          height .24rem
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
</style>
