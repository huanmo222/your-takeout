<!-- detail -->
<template>
  <transition name="fade">
    <div class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :score="seller.score" :size="48"></star>
          </div>
          <seller-infor title="优惠信息">
            <ul v-if="seller.supports">
              <li class="supports" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">
                  {{item.description}}
                </span>
              </li>
            </ul>
          </seller-infor>
          <seller-infor title="商家公告">
            <p class="bulletin">{{seller.bulletin}}</p>
          </seller-infor>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import Star from 'components/common/star/Star'
import SellerInfor from './SellerInfor'
export default {
  name: 'Detail',
  components: {
    Star,
    SellerInfor
  },
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  methods: {
    closeDetail () {
      this.$emit('closeDetail')
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    font-size 0
    transition all .5s
    -webkit-backdrop-filter blur(.1rem)
    // &.fade-transition
    &.fade-enter-to, &.fade-leave
      opacity 1
      background-color rgba(7, 17, 27, 0.8)
    &.fade-enter, &.fade-leave-to
      opacity 0
      background-color rgba(7, 17, 27, 0)
    .detail-wrapper
      width 100%
      min-height 100%
      text-align center
      .detail-main
        margin-top 1.28rem
        //向下撑开1.28rem,当内容足够长时,用来撑开给页脚元素用的位置
        padding-bottom 1.28rem
        .name
          line-height .32rem
          font-size .32rem
          font-weight 700
          color rgb(255, 255, 255)
        .star-wrapper
          margin-top .32rem
          margin-bottom .56rem
          padding .4rem 0
        .supports
          margin-bottom .24rem
          text-align left
          font-size 0
          &:last-child
            margin-bottom 0
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
              bg-img('decrease_2')
            &.discount
              bg-img('discount_2')
            &.guarantee
              bg-img('guarantee_2')
            &.invoice
              bg-img('invoice_2')
            &.special
              bg-img('special_2')
        .bulletin
          line-height .48rem
          font-size $FontSize-m
          text-align left
    .detail-close
      position relative
      width .64rem
      height .64rem
      //向上移动1.28rem,因自身宽度就是1.28rem,所以不会撑开父级元素
      margin -1.28rem auto 0 auto
      clear both
      font-size .64rem
</style>
