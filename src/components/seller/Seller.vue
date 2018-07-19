<!-- Seller -->
<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class="{active: favorite}" @click="handleFavoriteClick()"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <v-title title="公告与活动" class="bulletin">
        <p class="content">{{seller.bulletin}}</p>
        <ul v-if="seller.supports" class="supports-wrapper">
          <li class="supports" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">
              {{item.description}}
            </span>
          </li>
        </ul>
      </v-title>
      <split></split>
      <v-title title="商家实景">
        <div class="pic-wrapper" ref="pics">
          <ul class="pic-list" ref="picsList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </v-title>
      <split></split>
      <v-title title="商家信息">
        <ul class="info">
          <li class="info-item" v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
        </ul>
      </v-title>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from 'components/common/star/Star'
import Split from 'components/common/split/Split'
import VTitle from 'components/common/vtitle/VTitle'
import SellerInfor from 'components/home/header/component/SellerInfor'
import { saveToLocal, loadFromLocal } from 'common/js/store'
export default {
  name: 'Seller',
  components: {
    Star,
    Split,
    SellerInfor,
    VTitle
  },
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      favorite: (() => { // 此处获取不到刷新后的this.seller.id, 故监听seller变化时获取最新的值
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  watch: {
    'seller': function (newValue, oldValue) {
      this.handlePicsScroll()
      this.favorite = loadFromLocal(this.seller.id, 'favorite', false)
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  activated () {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.seller, {click: true})
    } else {
      this.scroll.refresh()
    }
    this.handlePicsScroll()
  },
  methods: {
    handlePicsScroll () {
      if (Object.keys(this.seller).length) {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          // 别忘记加单位, 否则设置无效!!!
          this.$refs.picsList.style.width = width + 'px'
          this.$nextTick(() => {
            this.picsScroll = new BScroll(this.$refs.pics, {click: true, scrollX: true})
          })
        } else {
          this.picsScroll.refresh()
        }
      }
    },
    handleFavoriteClick () {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .seller
    position absolute
    top 3.48rem
    bottom 0
    left 0
    width 100%
    overflow hidden
    .seller-content
      padding-bottom .92rem
      .overview
        position relative
        padding .36rem
        .title
          margin-bottom .16rem
          font-size .28rem
          color rgb(7, 17, 27)
        .star-wrapper
          display flex
          justify-content start
          align-items center
          padding-bottom .36rem
          font-size .2rem
          color rgb(77, 85, 93)
          border-1px(rgba(7, 17, 27, 0.1))
          .text
            margin-left .16rem
        .remark
          display flex
          padding-top .36rem
          text-align center
          .block
            flex 1
            border-right 0.02rem solid rgba(7, 17, 27, 0.1)
            &:last-child
              border-right none
            .title
              font-size .2rem
              color rgb(147, 153, 159)
              line-height .2rem
              margin-bottom .08rem
            .content
              font-size .2rem
              font-weight 200
              color rgb(7, 17, 27)
              line-height .48rem
              .stress
                font-size .48rem
        .favorite
          position absolute
          right .14rem
          top .36rem
          width 1rem
          font-size 0
          text-align center
          .icon-favorite
            display block
            font-size .48rem
            line-height .48rem
            margin-bottom .08rem
            color #d4d6d9
            &.active
              color rgb(240, 20, 20)
          .text
            display block
            line-height .2rem
            font-size .2rem
            color rgb(77,85,93)
      .bulletin
        padding .36rem .36rem 0
        .title
          line-height .28rem
          margin-bottom .16rem
          font-size .28rem
          font-weight 700
          color: rgb(7, 17, 27)
        .content
          padding 0 .24rem .32rem
          font-size .28rem
          font-weight 200
          color: rgb(240, 20, 20)
          line-height .48rem
          border-1px(rgba(7, 17, 27, 0.1))
      .supports-wrapper
        .supports
          padding .32rem .24rem
          text-align left
          font-size 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .text
            line-height .24rem
            font-size $FontSize-m
          .icon
            display inline-block
            vertical-align top
            margin-right .12rem
            width .24rem
            height .24rem
            &.decrease
              bg-img('decrease_4')
            &.discount
              bg-img('discount_4')
            &.guarantee
              bg-img('guarantee_4')
            &.invoice
              bg-img('invoice_4')
            &.special
              bg-img('special_4')
      .pic-wrapper
        width 100%
        font-size 0
        padding-bottom .32rem
        overflow hidden
        white-space nowrap
        .pic-item
          display inline-block
          margin-right .12rem
          width 2.4rem
          height 1.8rem
          &:last-child
            margin-right none
      .info
        .info-item
          padding .32rem .24rem
          border-1px(rgba(7, 17, 27, 0.1))
          font-size .24rem
          font-weight 200
          color: rgb(7, 17, 27)
          line-height .32rem
          &:last-child
            border-none()

</style>
