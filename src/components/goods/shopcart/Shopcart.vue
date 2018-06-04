<!-- Goods -->
<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费 ¥{{deliveryPrice}} 元</div>
      </div>
      <div class="content-right" :class="{'enough': payDesc=='去结算'}">{{payDesc}}</div>
      <transition name="drop">
        <div class="ball-container">
          <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shopcart',
  props: {
    selectFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }
      ]
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(ele => {
        total += ele.price * ele.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach(ele => {
        count += ele.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return `去结算`
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .shopcart
    position fixed
    z-index 50
    bottom 0
    left 0
    width 100%
    height .92rem
    background #141d27
    .content
      display flex
      height .92rem
      .content-left
        flex 1
        position relative
        .logo-wrapper
          display inline-block
          position relative
          top -0.24rem
          box-sizing border-box
          margin-left 0.24rem
          padding .12rem
          width 1.12rem
          height 1.12rem
          background #141d27
          border-radius 50%
          vertical-align top
          .num
            position absolute
            top 0
            right 0
            width .48rem
            height .32rem
            line-height .32rem
            text-align center
            border-radius .32rem
            font-size .18rem
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 .8rem .16rem 0 rgba(0,0,0,.4)
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              height .88rem
              line-height .88rem
              font-size .48rem
              color rgba(255,255,255,0.4)
              &.highlight
                color #fff
        .price
          display inline-block
          vertical-align top
          padding 0 .24rem
          margin-top .24rem
          height .48rem
          line-height .48rem
          font-size .32rem
          font-weight 700
          color rgba(255,255,255,0.4)
          border-right .02rem solid rgba(255,255,255,.1)
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin .22rem 0 0 12px
          line-height .48rem
          font-size .2rem
          font-weight 700
          color rgba(255,255,255,.4)
      .content-right
        flex 0 0 2.1rem
        font-size .24rem
        color rgba(255,255,255,.4)
        font-weight 700
        text-align center
        line-height .92rem
        background #2b333b
        &.enough
          background #00bd3c
          color #fff
      .ball-container
        .ball
          position fixed
          left .64rem
          bottom .44rem
          z-index 200
          width .32rem
          height .32rem
          border-radius 50%
          background rgb(0, 160, 220)
</style>
