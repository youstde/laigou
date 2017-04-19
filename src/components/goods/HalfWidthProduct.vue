<template>
  <div class="wrap clearfix">
    <product-click :id="product.id" :guessLike="guessLike"></product-click>
    <a class="product half-width" @click="doLog(product.id, product.title,product.skipUrl,link)">
      <div class="main-image">
        <img class="lazy" v-lazy="product.picUrl" width="100%" height="100%">
        <span class="new" v-if="product.isNew">上新</span>
        <span class="popular" v-if="product.isPopular">爆款</span>
      </div>
      <div class="product-info">

        <p class="title" style="-webkit-box-orient: vertical;">
          <mall :mall="product.source"></mall>
          <FreeShipping v-if="product.isPinkage"></FreeShipping>
          {{product.title}}
        </p>

        <p class="price">
          <span class="price-color">¥ {{product.price.toString().split('.')[0]}}</span><span class="price-color jiao" v-if="product.price.toString().split('.')[1]">.{{product.price.toString().split('.')[1]}}</span>
          <span class="coupon" v-if="product.isHasActivity">券后价</span>
          <span class="price-gray">¥ {{product.originPrice}}</span>
        </p>
        
      </div>
    </a>
  </div>

</template>

<script>
  import GetCoupon from './item/GetCoupon'
  import FreeShipping from './item/FreeShipping'
  import Mall from './item/Mall'
  import ShowCover from '../helper/ShowCover'

  import ProductClick from '../router/ProductClick'

  export default {
    components: {
      GetCoupon,
      FreeShipping,
      Mall,
      ShowCover,
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
    props: ['product', 'guessLike'],
    methods: {
      doLog(id, title, url, link) {
        MtaH5.clickStat('Goods', {
          'goodsname': id.toString()
        })
        MtaH5.clickStat('daohang', {
          'goods': 'true'
        })
        MtaH5.clickStat('yaofeng', {
          'goods': 'true'
        })
        MtaH5.clickStat('danchuang', {
          'goods': 'true'
        })
        MtaH5.clickStat('lunbo', {
          'goods': 'true'
        })
        mlinkTrack.sendEvent({
          a: 'c',
          cid: id
        });

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
  .wrap {
    position: relative;
  }

  .wrap .half-width {
    background-color: #fff;
    position: relative;
    display: block;
    width: 3.7rem;
    .main-image {
      position: relative;
      background-size: 100% 100%;
      overflow: hidden;
      width: 3.7rem;
      height: 3.7rem;
      .new,
      .popular {
        color: $white;
        font-size: 0.2rem;
        position: absolute;
        right: 0.1rem;
        top: 0;
        padding: 0.04rem;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 100%;
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 0.24rem solid transparent;
          border-right: 0.24rem solid transparent;
          border-top: 0.04rem solid $popular;
        }
      }
      .new {
        background-color: $popular;
      }
      .popular {
        background-color: $price;
        &::after {
          border-top: 0.04rem solid $price;
        }
      }
    }
    .product-info {
      position: relative;
      padding: 0.18rem 0.2rem;
      .title {
        font-size: 0.26rem;
        color: #555;
        line-height: 0.34rem;
        min-height: 0.9rem;
        overflow: hidden;
        margin-bottom: 0.24rem;
        word-wrap: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price-gray {
        font-size: 0.24rem;
        color: $color9;
        text-decoration: line-through;
        margin-bottom: 0.1rem;
        margin-left: 0.1rem;
      }
      .price {
        .price-color {
          font-size: 0.32rem;
          color: $price;
          &.jiao {
            font-size: 0.28rem;
          }
        }
      }
    }
    .coupon {
      font-size: 0.22rem;
      color: #ffffff;
      background-color: $price;
      border-radius: 0.04rem;
      padding: 0.01rem 0.06rem;
      position: relative;
      top: -0.04rem;
      &::after {
        /*content: "";*/
        position: absolute;
        left: -0.06rem;
        bottom: 0.015rem;
        display: inline-block;
        width: 0;
        height: 0;
        border-bottom: 0.12rem solid $price;
        border-left: 0.12rem solid transparent;
      }
    }
  }

</style>
