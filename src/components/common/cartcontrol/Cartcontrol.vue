<!-- star -->
<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="foods.count>0">-</div>
    <div class="cart-count" v-show="foods.count>0">1</div>
    <div class="cart-add" >+</div>
  </div>
</template>

<script>
export default {
  name: 'Cartcontrol',
  props: {
    foods: {
      type: Object,
      default () {
        return {
          count: 1
        }
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixin.styl'
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding .12rem
    .cart-decrease
      display inline-block
    .cart-decrease
      display inline-block
</style>
