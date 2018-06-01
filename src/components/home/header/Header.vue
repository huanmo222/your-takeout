<!--  -->
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img class="avatar-img" width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background" :style="{'background-image': `url(${seller.avatar})`}"></div>
    <detail v-show="detailShow" @closeDetail="closeDetail" :seller="seller"></detail>
  </div>
</template>

<script>
import Detail from './component/Detail'
export default {
  name: 'Header',
  components: {
    Detail
  },
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .header
    position relative
    overflow hidden
    color #fff
    background-color rgba(7,17,27,0.5)
    .content-wrapper
      position relative
      padding .48rem .24rem .36rem .48rem
      height 1.28rem
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        margin-right .32rem
        .avatar-img
          width 1.28rem
          height 1.28rem
          border-radius .04rem
      .content
        display inline-block
        height 100%
        .title
          margin 0.04rem 0 .16rem 0
          font-size $FontSize-l-x
          font-weight bold
          line-height .36rem
          .brand
            display inline-block
            vertical-align top
            width .6rem
            height .36rem
            bg-img('brand')
          .name
            margin-left .12rem
        .desc
          margin-bottom .2rem
          font-size $FontSize-m
          line-height .24rem
        .support
          font-size 0
          .text
            line-height .24rem
            font-size $FontSize-s
          .icon
            display inline-block
            vertical-align top
            margin-right .08rem
            width .24rem
            height .24rem
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
      .support-count
        display flex
        position absolute
        right .24rem
        bottom .28rem
        padding 0 .16rem
        height .48rem
        line-height .48rem
        justify-content space-between
        align-items center
        font-size $FontSize-s
        color #fff
        background-color rgba(0, 0, 0, 0.2)
        border-radius .28rem
        text-align center
        .icon-keyboard_arrow_right
          margin-left 2px
    .bulletin-wrapper
      position relative
      padding 0 .44rem 0 .24rem
      height .56rem
      line-height .56rem
      font-size $FontSize-s
      background-color rgba(7, 17, 27, 0.2)
      emphasis()
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top .16rem
        width .44rem
        height .24rem
        bg-img('bulletin')
        border-radius .04rem
      .bulletin-text
        margin 0 .08rem
      .icon-keyboard_arrow_right
        position absolute
        right .24rem
        top .16rem
        font-size $FontSize-s
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 2.68rem
      z-index -1
      filter blur(.1rem)
    .detail
      position fixed
      top 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background-color rgba(7, 17, 27, 0.8)
      // filter blur(.1rem)
      // transform: scale(1.2)
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 1.28rem
          //向下撑开1.28rem,当内容足够长时,用来撑开给页脚元素用的位置
          padding-bottom 1.28rem
      .detail-close
        position relative
        width .64rem
        height .64rem
        //向上移动1.28rem,因自身宽度就是1.28rem,所以不会撑开父级元素
        margin -1.28rem auto 0 auto
        clear both
        font-size .64rem
</style>
