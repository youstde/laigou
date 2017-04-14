<template>
  <div class="coupon-wrap clearfix">
    <product-click :id="product.id"></product-click>

    <a class="product half-width" @click="statisticalPoint(product.id, product.title,product.skipUrl)">
      <div class="main-image">
        <img class="lazy" v-lazy="product.picUrl" width="100%" height="100%">
      </div>
      <div class="product-info">
        <p class="title" style="-webkit-box-orient: vertical;">
          <mall :mall="product.source"></mall>
          {{product.title}}
        </p>

        <p class="price">
          <span class="activity-price">活动价:</span>
          <span class="price-color"><span style="font-size: 0.26rem;margin-right:0.02rem;font-weight: 500;">¥</span>{{product.price.toString().split('.')[0]}}</span>
          <span class="price-color jiao" v-if="product.price.toString().split('.')[1]">.{{product.price.toString().split('.')[1]}}</span>
          <span class="price-gray"> ¥{{product.originPrice}}</span>
        </p>

        <div class="actions lowprice clearfix">
          <buy-now></buy-now>
        </div>
      </div>

    </a>
  </div>

</template>

<script>
  import AfterCoupon from './item/AfterCoupon'
  import CouponCard from './item/CouponCard'
  import GetCoupon from '../item/GetCoupon'
  import BuyNow from './item/BuyNow'
  import ShowCover from '../item/ShowCover'
  import Mall from '../item/Mall'
  import ProductClick from '../../router/ProductClick'

  export default {
    components: {
      GetCoupon,
      Mall,
      ShowCover,
      AfterCoupon,
      CouponCard,
      BuyNow,
      ProductClick
    },
    data() {
      return {
        // link: `/detail/${this.product.id}`
      }
    },
    computed: {
      isWeiXin() {
        return this.$store.state.isWeiXin
      }
    },
    props: {
      design: {
        type: String,
        default: 'coupon'
      },
      product: {
        type: Object
      }
    },
    methods: {
      statisticalPoint(id, title, url) {
        // MtaH5.clickStat('clickgoods', {
        //   'goodsname': id.toString()
        // });
        // MtaH5.clickStat('shangpinlanxiad', {
        //   'ngoods': id.toString()
        // })
        // MtaH5.clickStat('lunbo', {
        //   'bgoods': id.toString()
        // })


        //        this.bcClick(url)

      },
      bcClick(url) {
        window.BC_SDK.goTaoke({
          tkUrl: url,
        });
      }
    }

  }

</script>

<style lang="scss" rel="stylesheet/scss">
  $pink: #ff4d73;
  $white: #ffffff;
  $color9: #999999;
  $color3: #333333;
  $price: #fe2947;
  $popular: #3cc3c1;
  .coupon-wrap {
    position: relative;
  }

  .coupon-wrap .half-width {
    background-color: #fff;
    position: relative;
    display: block;
    width: 3.5rem;
    .main-image {
      position: relative;
      background-size: 100% 100%;
      overflow: hidden;
      width: 3.5rem;
      height: 3.5rem;
    }
    .product-info {
      padding: 0.16rem 0.1rem 0.16rem;
      .title {
        font-size: 0.28rem;
        color: #444;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 0.20rem;
        text-overflow: ellipsis;
        text-align: center;
      }
      .price-gray {
        font-size: 0.26rem;
        color: $color9;
        text-decoration: line-through;
      }
      .price {
        margin-bottom: 0.18rem;
        padding-left: 0.36rem;
        .after-coupon {
          margin-right: 0.06rem;
        }
        .activity-price {
          margin-right: 0.06rem;
          font-size: 0.24rem;
          color: #ff6612;
        }
        .price-color {
          font-size: 0.36rem;
          font-weight: 700;
          color: $price;
          &.jiao {
            font-size: 0.28rem;
          }
        }
      }
    }
    .actions {
      &.coupon {
        .coupon-card {
          font-size: 0.36rem;
          width: 1.6rem;
          height: 0.6rem;
          float: left;
          margin-right: 0.05rem;
        }
        .buy-now {
          width: 1.6rem;
          height: 0.6rem;
          line-height: 0.58rem;
          float: left;
          margin-left: 0.05rem;
          border: 1px solid $pink;
          color: $pink;
          background-color: #fdedef;
        }
      }
      &.lowprice {
        text-align: center;
        .buy-now {
          width: 3.1rem;
          margin-left: 0rem;
          height: 0.6rem;
          line-height: 0.58rem;
          background-color: $price;
          border-radius: 4px;
          color: #fff;
        }
      }
    }
  }

</style>
