<!-- cartcontrol -->
<template>
  <div class="cartcontrol">
    <transition name="decrease">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <transition  name="count">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <transition name="add">
      <div class="cart-add" @click.stop="addCart">
        <i class="icon-add_circle"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      balls: state => state.balls.balls
    })
  },
  methods: {
    ...mapMutations(['changeShow', 'changeDropBall']),
    addCart (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.add(event)
    },
    add (event) {
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          this.changeShow({index: i, isShow: true, el: event.target})
          this.changeDropBall(this.balls[i])
          return
        }
      }
    },
    decreaseCart () {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixin.styl'
  .cartcontrol
    font-size 0
    height .76rem
    .cart-decrease, .cart-add
      display inline-block
      vertical-align top
      padding .12rem
      font-size .48rem
      color rgb(0,160,220)
      line-height .48rem
    .cart-decrease
      &.decrease-enter, &.decrease-leave-to
        opacity 0
        transform translate3d(.48rem, 0, 0) rotateZ(180deg)
      &.decrease-enter-to, &.decrease-leave
        opacity 1
        transform translate3d(0, 0, 0) rotateZ(0)
      &.decrease-enter-active, &.decrease-leave-active
        transition: all 0.4s linear
    .cart-count
      display inline-block
      width .24rem
      line-height .76rem
      font-size .2rem
      color rgb(147,153,159)
      text-align center
      &.count-enter, &.count-leave-to
        opacity 0
      &.count-enter-to, &.count-leave
        opacity 1
      &.count-enter-active, &.count-leave-active
        transition: all .5s linear

</style>
