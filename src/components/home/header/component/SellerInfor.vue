<!-- Title -->
<template>
  <div class="seller-infor">
    <div class="title">
      <div class="line" v-show="title"></div>
      <div class="title-text">{{title}}</div>
      <div class="line" v-show="title"></div>
    </div>
    <div class="content">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SellerInfor',
  props: {
    title: String
  }
}
</script>

<style lang='stylus' scoped>
.seller-infor
  box-sizing border-box
  width 100%
  padding 0 .72rem
  .title
    display flex
    align-items center
    .line
      flex 1
      height 1px
      background #ccc
    .title-text
      padding 0 .24rem
      line-height .28rem
      font-size .28rem
      font-weight 700
      color rgb(255, 255, 255)
  .content
    box-sizing border-box
    padding .48rem .24rem .56rem
</style>
