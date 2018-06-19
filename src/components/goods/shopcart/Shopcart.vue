<!-- Shopcart -->
<template>
  <div>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="handleMaskClick"></div>
    </transition>
    <div class="shopcart">
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <div class="title">购物车</div>
            <div class="empty" @click="handleEmptyClick">清空</div>
          </div>
          <div class="listContent" ref="listContent">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="food-right">
                  <div class="price">
                    <span>¥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="content" @click="toggleList">
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
        <!-- 当点击去结算的时候, 使列表的显示与隐藏的点击不被触发, 就需要阻止冒泡 -->
        <div class="content-right" :class="{'enough': payDesc=='去结算'}" @click.stop.prevent="handlePayClick">{{payDesc}}</div>
        <div class="ball-container">
          <transition v-for="(ball,index) in balls" :key="index" name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show" >
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Cartcontrol from 'components/common/cartcontrol/Cartcontrol'
import BScroll from 'better-scroll'
export default {
  name: 'Shopcart',
  components: {
    Cartcontrol
  },
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
      fold: true// 折叠
    }
  },
  computed: {
    ...mapState({
      balls: state => state.balls.balls,
      dropBall: state => state.balls.dropBall
    }),
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
    },
    listShow () {
      if (!this.totalCount) {
        // 计算属性一般不要进行复制操作, 计算属性的set的需要自身的值发生变化才可以触发.
        // eslint-disable-next-line
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          // 如果已经初始化过, 就只刷新就可以了.
          if (!this.scroll) {
            // eslint-disable-next-line
            this.scroll = new BScroll(this.$refs.listContent, {click: true})
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    ...mapMutations(['changeShow', 'changeDropBall']),
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // 返回值是一个 DOMRect 对象, 此包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
          // 除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          // 小球外层控制y轴的运动轨迹,translate3d()可以开启硬件加速
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          // 内层小球控制x轴运动轨迹,内外层运动方式是不一样的, y轴贝塞尔曲线, x轴匀速.
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el) {
      // 触发浏览器重绘
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = `translate3d(0, 0, 0)`
        inner.style.transform = `translate3d(0, 0, 0)`
      })
    },
    afterEnter (el) {
      // 删除数组第一个元素, 并返回第一个元素,因对象都是指向地址,所以操作dropBall数组也就操作了balls数组
      let ball = this.dropBall.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    handleEmptyClick () {
      this.selectFoods.forEach(food => {
        food.count = 0
      })
    },
    handleMaskClick () {
      this.fold = true
    },
    handlePayClick () {
      if (this.payDesc === '去结算') {
        // this.$router.push('/')
        window.alert(`需支付${this.totalPrice}元`)
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
    .content
      display flex
      height .92rem
      background #141d27
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
            color #fff
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
          &.drop-enter-active
            transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width .32rem
            height .32rem
            border-radius 50%
            background rgb(0, 160, 220)
            transition: all .4s linear
    .shopcart-list
      position absolute
      left 0
      bottom 0.92rem
      z-index -100
      width 100%
      &.fold-enter, &.fold-leave-to
        transform translate3d(0, 100%, 0)
      &.fold-enter-to, &.fold-leave
        transform translate3d(0, 0, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s linear
      .list-header
        display flex
        justify-content space-between
        align-items center
        height .8rem
        line-height .8rem
        padding 0 .36rem
        background #f3f5f7
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        .title
          font-size .28rem
          color rgb(7, 17, 27)
        .empty
          font-size .24rem
          color rgb(0, 160, 220)
      .listContent
        padding 0 .36rem
        max-height 4.34rem
        overflow hidden
        background #fff
        .food
          display flex
          justify-content space-between
          align-items center
          padding .24rem 0
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height .48rem
            font-size .28rem
            color rgb(7, 17, 27)
          .food-right
            display flex
            justify-content space-between
            align-items center
            .price
              margin-right .24rem
              line-height .48rem
              font-size .28rem
              font-weight 700
              color rgb(240, 20, 20)
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    opacity 1
    // 动画需要设置一个静态的背景色
    background rgba(7, 17, 27, 0.6)
    // z-index 40
    backdrop-filter blur(.2rem)
    &.mask-enter, &.mask-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
    &.mask-enter-to, &.mask-leave
      opacity 1
      background rgba(7, 17, 27, 0.6)
    &.mask-enter-active, &.mask-leave-active
      transition: all .4s linear
</style>
