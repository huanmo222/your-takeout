<!-- FoodDetail -->
<template>
  <transition name="food" >
    <div class="food-detail" v-show="showFlag" ref="foodDetail">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="handleHiddenClick">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥&nbsp;<span class="now-price">{{food.price}}</span></span><span class="old" v-show="food.oldPrice">¥&nbsp;{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food" ref="cartcontrol"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="buy" v-show="!food.count || food.count === 0" @click="handleAddFirst($event)">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from 'components/common/cartcontrol/Cartcontrol'
export default {
  name: 'FoodDetail',
  props: {
    food: {
      type: Object
    }
  },
  components: {
    Cartcontrol
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    // 显示详细food信息, 父组件直接调用
    handleShowFlag () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodDetail, {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    handleHiddenClick () {
      this.showFlag = false
    },
    handleAddFirst (event) {
      // 调用小球动画的方法, 传入当前点击对象
      // 点击的对象需要做一个动画, 以便可以获取点击的位置,否则点击之后立即隐藏了,无法正确获取位置
      this.$refs.cartcontrol.add(event)
      this.$set(this.food, 'count', 1)
    }
  }
}
</script>

<style lang='stylus' scoped>
  .food-detail
    position fixed
    left 0
    top 0
    bottom .92rem
    z-index 30
    width 100%
    background #fff
    &.food-enter, &.food-leave-to
      transform translate3d(100%, 0, 0)
    &.food-enter-to, &.food-leave
      transform translate3d(0, 0, 0)
    &.food-enter-active,&.food-leave-active
      transition all .2s linear
    .img-header
      position relative
      width 100%
      height 0
      padding-bottom 100% // 设置为百分比时相对于width的
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top .2rem
        left 0
        .icon-arrow_lift
          display block
          padding .2rem
          color #fff
          font-size .4rem
    .content
      padding .36rem
      .title
        line-height .28rem
        margin-bottom .16rem
        font-size .28rem
        font-weight 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom .36rem
        line-height .2rem
        height .2rem
        font-size 0
        .sell-count, .rating
          font-size .2rem
          color rgb(147, 153, 159)
        .sell-count
          margin-right: .24rem
      .price
        font-size .2rem
        font-weight 700
        line-height .48rem
        color rgb(147, 153, 159)
        .now
          margin-right .16rem
          color rgb(240, 20, 20)
          .now-price
            font-size .28rem
            font-weight 700
        .old
          text-decoration line-through
    .cartcontrol-wrapper
      position absolute
      right .24rem
      bottom .24rem
    .buy
      position absolute
      right .36rem
      bottom .36rem
      z-index 10
      box-sizing border-box
      padding  0 .24rem
      height .48rem
      line-height .48rem
      border-radius .24rem
      font-size .2rem
      color #fff
      background rgb(0, 160, 220)
      &.fade-enter, &.fade-leave-to
        opacity 0
      &.fade-enter-to, &.fade-leave
        opacity 1
      &.fade-enter-active, &.fade-leave-active
        transition opacity 1s

</style>
