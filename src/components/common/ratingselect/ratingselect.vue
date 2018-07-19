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
  </div>
</template>

<script>
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'ratingSelect',
  props: {
    // 用来计算好评与否的信息条数
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    // 当前选中
    selectType: {
      type: Number,
      default () {
        return ALL
      }
    },
    // 只看内容
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
    // 好评数量
    positives () {
      let count = 0
      this.ratings.forEach(ele => {
        if (ele.rateType === 0) {
          count++
        }
      })
      return count
    },
    // 差评数量
    negatives () {
      return this.ratings.length - this.positives
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

</style>
