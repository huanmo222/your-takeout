<!-- Tab -->
<template>
  <div class="tab">
    <div class="tab-item">商品</div>
    <div class="tab-item">评价</div>
    <div class="tab-item">商标</div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
  .tab
    display flex
    width 100%
    height .8rem
    line-height .8rem
    .tab-item
      flex 1

</style>
