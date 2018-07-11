<!-- ratingSelect -->
<template>
  <div class="rating-select">
    <div class="rating-type">
      <span @click="handleSelectClick(2)" class="block positive" :class="{'active': selectType1 === 2}">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span @click="handleSelectClick(0)" class="block positive" :class="{'active': selectType1 === 0}">
        {{desc.positive}}
        <span class="count">{{positives}}</span>
      </span>
      <span @click="handleSelectClick(1)" class="block negative" :class="{'active': selectType1 === 1}">
        {{desc.negative}}
        <span class="count">{{negatives}}</span>
      </span>
    </div>
    <div class="switch">
      <span @click="handleToggleContentClick" class="icon-check_circle" :class="{'on': onlyContent1 === true}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <ul class="rating-list" v-if="ratings && ratings.length">
      <li v-show="needShow(rating.rateType, rating.text)" class="rating-detail" v-for="(rating, index) in ratings" :key="index">
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
</template>

<script>
import { formateDate } from 'common/js/date'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'ratingSelect',
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default () {
        return ALL
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 组件的默认标题
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data () {
    return {
      selectType1: this.selectType,
      onlyContent1: this.onlyContent
    }
  },
  computed: {
    // 好评
    positives () {
      let count = 0
      this.ratings.forEach(ele => {
        if (ele.rateType === 0) {
          count++
        }
      })
      return count
    },
    // 差评
    negatives () {
      return this.ratings.length - this.positives
    }
  },
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    // 切换
    handleSelectClick (type) {
      this.selectType1 = type
      this.$emit('ratingType', type)
    },
    handleToggleContentClick () {
      this.onlyContent1 = !this.onlyContent1
      this.$emit('toggleContentClick')
    },
    needShow (type, text) {
      // 如果选择只显示有内容,并且text为空, 则不显示
      if (this.onlyContent1 && !text) {
        return false
      }
      // 如果不符合上一条, 则进行以下判断
      // 如果为全部, 则全部显示
      if (this.selectType1 === ALL) {
        return true
      } else {
        // 否则, 当前选中类型===食品的评价类型时, 显示
        return type === this.selectType1
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/mixin.styl'
.rating-select
  .rating-type
    padding 0 0 .36rem
    margin 0 .36rem
    border-1px(rgba(7, 17, 27, 0.1))
    font-size 0
    .block
      display inline-block
      padding .16rem .24rem
      margin-right .16rem
      font-size .24rem
      color rgb(77, 85, 93)
      line-height .32rem
      border-radius .02rem
      &.positive
        background-color rgba(0, 160, 220, 0.2)
      &.negative
        background-color rgba(77, 85, 93, 0.2)
      .count
        margin-left .04rem
        font-size .16rem
      &.active
        color rgb(255, 255, 255)
        background-color rgba(0, 160, 220, 1)
  .switch
    padding .24rem 0.36rem
    color rgb(147, 153, 159)
    height .48rem
    line-height .48rem
    font-size 0
    border-1px(rgba(7, 17, 27, 0.1))
    .icon-check_circle
      font-size .48rem
      margin-right .08rem
      &.on
        color: #00c850
    .text
      font-size .24rem
      vertical-align top
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
