<!-- star -->
<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" class="star-item" :class="itemClass" :key="index"></span>
  </div>
</template>

<script>
export default {
  name: 'Star',
  props: {
    size: Number,
    score: Number
  },
  data () {
    return {
      length: 5, // 定义常量便于后期修改或者维护
      class_on: 'on',
      class_off: 'off',
      class_half: 'half'
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(this.class_on)
      }
      if (hasDecimal) {
        result.push(this.class_half)
      }
      while (result.length < this.length) {
        result.push(this.class_off)
      }
      return result
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixin.styl'
  .star
    font-size 0
    .star-item
      display inline-block
    &.star-48
      .star-item
        width .4rem
        height .38rem
        margin-right .43rem
        &:last-child
          margin-right 0
        &.on
          bg-img('star48_on')
        &.off
          bg-img('star48_off')
        &.half
          bg-img('star48_half')
    &.star-36
      .star-item
        width .3rem
        height .29rem
        margin-right .2rem
        &:last-child
          margin-right 0
        &.on
          bg-img('star36_on')
        &.off
          bg-img('star36_off')
        &.half
          bg-img('star36_half')
    &.star-24
      .star-item
        width .2rem
        height .19rem
        margin-right .12rem
        &:last-child
          margin-right 0
        &.on
          bg-img('star24_on')
        &.off
          bg-img('star24_off')
        &.half
          bg-img('star24_half')
</style>
