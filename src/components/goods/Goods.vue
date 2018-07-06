<!-- Goods -->
<template>
  <div class="goods">
    <v-menu @handleMenuClick="handleCurrentChange" :goods="goods" :currentIndex="currentIndex"></v-menu>
    <v-foods
      @handleCurrentChange="handleCurrentChange"
      @handleSelectedFood="handleSelectedFood"
      :goods="goods" :currentIndex="currentIndex"
    ></v-foods>
    <shopcart ref="shopcart" :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food" ></food>
  </div>
</template>

<script>
import VMenu from './menu/Menu'
import VFoods from './foods/Foods'
import Shopcart from './shopcart/Shopcart'
import Food from './fooddetail/FoodDetail'
import Cartcontrol from 'components/common/cartcontrol/Cartcontrol'
export default {
  name: 'Goods',
  components: {
    VMenu,
    VFoods,
    Shopcart,
    Cartcontrol,
    Food
  },
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      listHeight: [],
      scrollY: 0,
      currentIndex: 0,
      seller: {},
      selectedFood: {} // 点击选中的food,展示详情页面
    }
  },
  computed: {
    selectFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  mounted () {
    this.getInfor()
  },
  methods: {
    // 以下划线开始的方法, 一般是私有方法
    getInfor () {
      this.$axios.get('../static/mock/data.json')
        .then(res => {
          let data = res.data
          if (res.status === 200) {
            this.goods = data.goods
            this.seller = data.seller
            console.log(this.goods)
          }
        })
    },
    handleCurrentChange (index) {
      // console.log(index)
      this.currentIndex = index
    },
    handleSelectedFood (food) {
      this.selectedFood = food
      this.$refs.food.handleShowFlag()
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 3.48rem
    left 0
    bottom .92rem
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 1.6rem
      width 1.6rem
      background #f3f5f7
      .menu-item
        display table
        padding 0 .24rem
        width 1.12rem
        height 1.08rem
        line-height 0.28rem
        &.current
          position relative
          z-index 10
          top -.02rem
          background #fff
          .text
            color rgb(7, 17, 27)
            font-weight 700
            border-none()
        .text
          display table-cell
          vertical-align middle
          width 1.12rem
          font-size .24rem
          color rgb(20, 20, 20)
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            vertical-align top
            margin-right .04rem
            width .24rem
            height .24rem
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
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
