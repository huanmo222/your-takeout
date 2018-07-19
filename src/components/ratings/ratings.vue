<!-- Ratings -->
<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content" >
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="service-wrapper">
            <span class="title">服务态度</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="servicescore">{{seller.serviceScore}}</span>
          </div>
          <div class="service-wrapper">
            <span class="title">商品评分</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="servicescore">{{seller.foodScore}}</span>
          </div>
          <div class="service-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="rating-padding"></div>
      <rating-select
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        :ratings="ratings"
        @ratingType="ratingType"
        @toggleContentClick="toggleContentClick"
      ></rating-select>
      <ul class="rating-list" v-if="ratings && ratings.length">
        <li v-show="needShow(rating.rateType, rating.text)" class="rating-detail" v-for="(rating, index) in ratings" :key="index">
          <img class="avatar" :src="rating.avatar">
          <div class="rating-wrapper">
            <div class="title">
              <h1 class="username">{{rating.username}}</h1>
              <div class="time">{{rating.rateTime | formateDate}}</div>
            </div>
            <div class="star-wrapper">
              <star :size="36" :score="rating.score"></star>
              <span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-if="rating.recommend.length">
              <span class="icon-thumb_up"></span>
              <div class="recommend-item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="no-ratings" v-else>暂无评价</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from 'components/common/star/Star'
import Split from 'components/common/split/Split'
import RatingSelect from 'components/common/ratingselect/RatingSelect'
import { formateDate } from 'common/js/date'
const ALL = 2
export default {
  name: 'Ratings',
  components: {
    Star,
    Split,
    RatingSelect
  },
  props: {
    seller: {
      type: Object
    },
    ratings: {
      type: Array
    }
  },
  data () {
    return {
      selectType: 2,
      onlyContent: false,
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
  mounted () {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.ratings, {click: true})
    } else {
      this.scroll.refresh()
    }
  },
  methods: {
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
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/mixin.styl'
  .ratings
    position absolute
    top 3.548rem
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding .36rem 0
      .overview-left
        flex 0 0 2.75rem
        padding-bottom .12rem
        width 2.75rem
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        .score
          font-size .48rem
          color rgb(255, 153, 0)
          line-height .56rem
          margin-bottom .12rem
        .title
          font-size .24rem
          color rgb(7, 17, 27)
          line-height .24rem
          margin-bottom .16rem
        .rank
          font-size .2rem
          color rgb(147, 153, 159)
          line-height .2rem
      .overview-right
        flex 1
        padding-left .48rem
        font-size 0
        .service-wrapper
          display flex
          align-items center
          margin-bottom .16rem
          &:last-child
            margin-bottom 0
          .title
            vertical-align top
            margin-right .24rem
            font-size .24rem
            color rgb(7, 17, 27)
            height .24rem
            line-height .24rem
          .star-wrapper
            margin-right .24rem
          .servicescore
            font-size .24rem
            color rgb(255, 153, 0)
            height .36rem
            line-height .36rem
          .deliveryTime
            font-size .24rem
            color rgb(147, 153, 159)
            height .36rem
            line-height .36rem
    .rating-padding
      height 0.36rem
      width 100%
    .rating-list
      .rating-detail
        display flex
        padding .32rem 0
        margin 0 .36rem
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          width .56rem
          height .56rem
          margin-right .24rem
          border-radius 50%
        .rating-wrapper
          flex 1
          .title
            display flex
            width 100%
            justify-content space-between
            align-items center
            font-size .2rem
            line-height .24rem
            margin-bottom .08rem
            .username
              color rgb(7, 17, 27)
            .time
              color rgb(147, 153, 159)
          .star-wrapper
            display flex
            justify-content star
            align-items center
            font-size 0
            margin-bottom .12rem
            .deliveryTime
              display inline-block
              font-size 0.2rem
              color rgb(147, 153, 159)
              line-height .24rem
              margin-left .12rem
      .text
        font-size .24rem
        color rgb(7, 17, 27)
        line-height .36rem
        margin-bottom .16rem
      .recommend
        line-height .32rem
        font-size 0
        .icon-thumb_up, .icon-thumb_down
          margin-right: .16rem
        .icon-thumb_up
          font-size 0.32rem
          color rgb(0, 160, 220)
        .icon-thumb_down
          color rgb(147, 153, 159)
        .recommend-item
          display inline-block
          vertical-align top
          padding 0 .12rem
          max-width 1.2rem
          border 0.02rem solid rgba(7, 17, 27, 0.1)
          text-align left
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size .18rem
          color rgb(147, 153, 159)
          margin-right .16rem
          margin-bottom .16rem
    .no-ratings
      padding .32rem 0
      font-size .24rem
      color rgb(147,153,159)
      text-align center
</style>
