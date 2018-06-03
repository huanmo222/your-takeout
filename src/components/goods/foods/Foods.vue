<!-- Goods -->
<template>
  <div class="foods-wrapper" ref="foods">
    <ul>
      <li class="food-list" v-for="(item, index) in goods" :key="index" :ref="'food'+index">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li class="food-item border-1px" v-for="(food, i) in item.foods" :key="i">
            <div class="icon">
              <img class="icon-img" :src="food.icon">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="description" v-show="food.description">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
              </div>
              <div class="price">
                <span class="now">¥&nbsp;<span class="now-price">{{food.price}}</span></span><span class="old" v-show="food.oldPrice">¥&nbsp;{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Cartcontrol from 'components/common/cartcontrol/Cartcontrol'
export default {
  name: 'Goods',
  components: {
    Cartcontrol
  },
  props: {
    goods: {
      type: Array
    },
    currentIndex: {
      type: Number
    }
  },
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      currentFoodIndex: this.currentIndex
    }
  },
  mounted () {
    this._initScroll()
  },
  watch: {
    currentIndex (newValue) {
      if (this.currentIndex !== this.currentFoodIndex) {
        this.foodScroll.scrollToElement(this.$refs['food' + newValue][0], 100)
      }
    },
    currentFoodIndex (newValue) {
      this.$emit('handleCurrentChange', newValue)
    }
  },
  methods: {
    getCurrentFoodIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    _initScroll () {
      this.foodScroll = new BScroll(this.$refs.foods, {click: true, probeType: 3})
      this.handleFoodsScroll()
    },
    _calculateHeight () {
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < this.goods.length; i++) {
        let item = this.$refs['food' + i][0]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    handleFoodsScroll () {
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        this._calculateHeight()
        this.currentFoodIndex = this.getCurrentFoodIndex()
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .foods-wrapper
    background #fff
    flex 1
    .title
      position relative
      padding-left .26rem
      height .52rem
      line-height .52rem
      font-size $FontSize-m
      color rgb(147, 153, 159)
      font-weight 700
      background #f3f5f7
      border-left .04rem solid #d9dde1
    .food-item
      display flex
      margin .36rem
      padding-bottom .36rem
      border-1px(rgba(7, 17, 27, .1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 1.14rem
        width 1.14rem
        height 1.14rem
        margin-right .2rem
        .icon-img
          width 100%
          height 100%
      .content
        flex 1
        .name
          margin .04rem 0 .16rem 0
          font-size .28rem
          color rgb(7, 17, 27)
          line-height .28rem
        .description
          margin-bottom .16rem
        .description, .extra
          font-size .2rem
          color rgb(147, 153, 159)
          line-height .2rem
        .extra
          .count
            margin-right .24rem
        .price
          font-size .2rem
          font-weight 700
          line-height .48rem
          color rgb(147, 153, 159)
          .now
            margin-right .16rem
            color rgb(240, 20, 20)
            .now-price
              font-size .28rem
              font-weight 700
          .old
            text-decoration line-through
</style>
