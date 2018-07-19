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
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" ref="cartcontrol"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click="handleAddFirst($event)">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
        </div>
        <rating-select
          :selectType="selectType"
          :onlyContent="onlyContent"
          :desc="desc"
          :ratings="food.ratings"
          @ratingType="ratingType"
          @toggleContentClick="toggleContentClick"
        ></rating-select>
        <ul class="rating-list" v-if="food.ratings && food.ratings.length">
          <li v-show="needShow(rating.rateType, rating.text)" class="rating-detail" v-for="(rating, index) in food.ratings" :key="index">
            <div class="rating-time">
              <div class="time">{{rating.rateTime | formateDate}}</div>
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" :src="rating.avatar">
              </div>
            </div>
            <div class="text">
              <span :class="rating.rateType === 0? 'icon-thumb_up' : 'icon-thumb_down'"></span>
              {{rating.text}}
            </div>
          </li>
        </ul>
        <div class="no-ratings" v-else>暂无评价</div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from 'components/common/cartcontrol/Cartcontrol'
import Split from 'components/common/split/Split'
import RatingSelect from 'components/common/ratingselect/RatingSelect'
import { formateDate } from 'common/js/date'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  name: 'FoodDetail',
  props: {
    food: {
      type: Object
    }
  },
  components: {
    Cartcontrol,
    Split,
    RatingSelect
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }
  },
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    // 显示详细food信息, 父组件直接调用
    handleShowFlag () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
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
    },
    // 子组件调用改变父组件的selectType
    ratingType (type) {
      this.selectType = type
      // 原代码是有以下这个部分的, 是因为更新selectType后没有重新获取DOM, 回弹的距离不对
      // 但是已经试验过, 现在有没有这段代码也没问题.
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContentClick () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      // 如果选择只显示有内容,并且text为空, 则不显示
      if (this.onlyContent && !text) {
        return false
      }
      // 如果不符合上一条, 则进行以下判断
      // 如果为全部, 则全部显示
      if (this.selectType === ALL) {
        return true
      } else {
        // 否则, 当前选中类型===食品的评价类型时, 显示
        return type === this.selectType
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/mixin.styl'
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
      position relative
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
    .info, .rating
      padding .36rem
      .tilte
        line-height .28rem
        font-size .28rem
        color rgb(7, 17, 27)
        margin-bottom .12rem
      .text
        padding 0 .16rem
        line-height .48rem
        color rgb(77, 85, 93)
        font-size .24rem
    .rating-list
      .rating-detail
        padding .32rem 0
        margin 0 .36rem
        border-1px(rgba(7, 17, 27, 0.1))
        .rating-time
          display flex
          justify-content space-between
          align-items center
          font-size .2rem
          color rgb(147, 153, 159)
          line-height .24rem
          margin-bottom .12rem
          .user
            display flex
            justify-content space-between
            align-items center
            font-size 0
            .name
              font-size .2rem
              margin-right .12rem
            .avatar
              width .24rem
              height .24rem
              border-radius 50%
      .text
        font-size .24rem
        color rgb(7, 17, 27)
        line-height .32rem
        .icon-thumb_up, .icon-thumb_down
          margin-right: .08rem
        .icon-thumb_up
          color rgb(0, 160, 220)
        .icon-thumb_down
          color rgb(147, 153, 159)
    .no-ratings
      padding .32rem 0
      font-size .24rem
      color rgb(147,153,159)
      text-align center

</style>
