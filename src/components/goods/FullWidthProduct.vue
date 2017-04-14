<template>
  <div class="wrap">
    <product-click :id="product.id"></product-click>
    <a class="product full-width fullWidthProduct" @click="doLog(product.id, product.title, product.skipUrl)">
      <div class="main-image">
        <img class="lazy" v-lazy="product.picUrl" width="100%" height="100%">
        <span class="new" v-if="product.isNew">上新</span>
        <span class="popular" v-if="product.isPopular">爆款</span>
      </div>
      <div class="product-info">
        <div id="fullWidth-mall-box">
          <mall :mall="product.source"></mall>
        </div>
        <p class="title" style="-webkit-box-orient: vertical;">
          <FreeShipping v-if="product.isPinkage"></FreeShipping>
          {{product.title}}
        </p>
        <p class="price">
          <span class="price-name" v-if="product.isHasActivity">券后价:</span>
          <span class="price-name" v-if="!product.isHasActivity">折后价:</span>
          <span class="price-tag">¥ </span>

          <span class="price-color">{{product.price.toString().split('.')[0]}}</span><span class="price-color jiao" v-if="product.price.toString().split('.')[1]">.{{product.price.toString().split('.')[1]}}</span>
          <GetCoupon v-if="product.isHasActivity&&product.activityPrice" :coupon="product.activityPrice"></GetCoupon>
          <span class="price-gray">¥{{product.originPrice}}</span>
        </p>
        <p class="sold">已购 {{product.saleCount}} 件</p>
        <span class="get-now" v-if="!product.isHasActivity&&product.source==='TB'">去淘宝</span>
        <span class="get-now" v-if="!product.isHasActivity&&product.source==='TM'">去天猫</span>
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
    props: ['product'],
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
    methods: {
      doLog(id, title, url) {
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
        MtaH5.clickStat('shouye', {
          'goods': 'true'
        })
        mlinkTrack.sendEvent({
          a: 'c',
          cid: id
        });

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
  $color3: #444;
  $price: #fe2947;
  $popular: #3cc3c1;
  $lineColor: #e6e6e6;
  .wrap {
    position: relative;
  }

  .weixinlink {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    z-index: 90;
  }

  .fullWidthProduct {
    border-bottom: 0.5px solid $lineColor;
  }
  #fullWidth-mall-box {
    position: absolute;
    top:1.1rem;
    right: 0.2rem;
  }
  .full-width {
    height: 3.2rem;
    padding: 0.2rem;
    background-color: #fff;
    display: block;
    .main-image {
      width: 2.8rem;
      height: 2.8rem;
      float: left;
      position: relative;
      background-size: 100% 100%;
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
      padding: 0.2rem;
      position: relative;
      margin-left: 2.8rem;
      .title {
        font-size: 0.3rem;
        color: $color3;
        line-height: 0.34rem;
        min-height: 0.68rem;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: 700;
      }
      .price-name {
        font-size: 0.26rem;
        color: $color9;
      }
      .price-tag {
        font-size: 0.26rem;
        color: $price;
        font-weight: 700;
      }
      .price {
        margin: 0.3rem 0 0;
        .price-color {
          font-size: 0.46rem;
          color: $price;
          &.jiao {
            font-size: 0.36rem;
          }
        }
        .price-gray {
          font-size: 0.24rem;
          color: $color9;
          text-decoration: line-through;
        }
      }
      .sold {
        font-size: 0.26rem;
        color: #555;
        position: absolute;
        top: 2.38rem;
        left: 0.2rem;
      }
      .get-now {
        font-size: 0.28rem;
        color: #fff;
        background-color: #fe2947;
        width: 1.30rem;
        height: 0.50rem;
        position: absolute;
        top: 2.18rem;
        right: 0rem;
        border: 1px solid $pink;
        text-align: center;
        line-height: 0.45rem;
        border-radius: 0.04rem;
      }
    }
  }

</style>
