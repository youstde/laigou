<template>
  <div class="page-item-detail">
    <detail-back-nav></detail-back-nav>
    <div class="item-detail">
      <div class="item-carousel">
        <swiper :options="swiperOption">
          <swiper-slide v-for="pic of item.tbImgList" :style="{'backgroundImage':`url(${pic})`}"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="item-info">
        <div class="item-price">
          <price :price="item.price" :originPrice="item.originPrice"></price>
          <span class="coupon" v-if="item.isHasActivity">{{ item.activityPrice }}元优惠券</span>
          <span class="sold">已购 {{item.saleCount}} 件</span>
        </div>
        <p class="title">
          <mall :mall="item.source"></mall>
          <FreeShipping v-if="item.isPinkage"></FreeShipping>
          {{item.title}}
        </p>
        <p class="recommended" v-if="item.recommend">小编推荐:{{ item.recommend }}</p>
      </div>
    </div>
    <div class="item-tabs">
      <a :class="{active: itemToggle==='detail'}" @click="toggleTabs('detail')" v-if="item.detailInfoList.length>0">商品详情</a>
      <a :class="{active: itemToggle==='comment'}" @click="toggleTabs('comment',item.id)" v-if="item.commentInfoList.length>0">商品评论</a>
    </div>

    <div class="item-picture" v-if="item.detailInfoList.length>0&&itemToggle==='detail'">
      <div class="">
        <img v-for="img of item.detailInfoList" :src="img" alt="" width="100%">
      </div>
      <!--<span class="open-click" @click="openDetail()">{{ isOpenDetail?'收起图文详情':'查看图文详情' }}</span>-->
    </div>
    <div class="item-comment-list" v-if="item.commentInfoList.length>0&&itemToggle==='comment'">
      <div class="item-comment" v-for="comment of item.commentInfoList">
        <p class="buyer">{{comment.buyerNick}} <span>{{comment.createTime}}</span></p>
        <p class="comment">{{comment.comment}}</p>
      </div>
    </div>
    <div class="item-guess">
      <div class="guess-title"><span>猜你喜欢</span></div>
      <div class="guess-list clearfix">
        <HalfWidthProduct :product="product" v-for="product in guessList" v-bind:data="product" v-bind:key="product.title" :guessLike="true"></HalfWidthProduct>
      </div>
    </div>
    <div class="item-footer">
      <show-cover v-if="isWeiXin"></show-cover>
      <div class="actions" @click="bcClick(item.id,item.title,item.skipUrl)">
        <!--<div class="price">
          <span class="price-name" v-if="item.isHasActivity">券后价:</span>
          <span class="price-name" v-if="!item.isHasActivity">折后价:</span>
          <span class="price-num">¥{{ item.price }}</span>
        </div>-->
        <div class="price">
          <img src="../../assets/img/detail_footer.jpg" alt="">
        </div>
        <div class="coupon" v-if="item.isHasActivity"><span style="font-size: 0.26rem;">优惠券</span><span style="font-size: 0.32rem;">{{ item.activityPrice }}元</span>
        </div>

        <div class="coupon" v-if="!item.isHasActivity">
          <span style="font-size: 0.26rem;">加入购物车</span>
        </div>

        <div class="buy">{{ item.isHasActivity? '领券抢购':'立即抢购' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import DetailBackNav from '../../components/router/DetailBackNav'

  import Price from '../../components/detail/Price'
  import FreeShipping from '../../components/goods/item/FreeShipping'
  import Mall from '../../components/goods/item/Mall'
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  import HalfWidthProduct from '../../components/goods/HalfWidthProduct'
  import Utils from '@/assets/js/utils'
  import ShowCover from '../../components/helper/ShowCover'

  export default {
    components: {
      Price,
      FreeShipping,
      swiper,
      swiperSlide,
      HalfWidthProduct,
      DetailBackNav,
      ShowCover,
      Mall
    },
    data() {
      return {
        swiperOption: {
          autoplay: 0,
          pagination: '.swiper-pagination',
          paginationClickable: true,
        },
        item: {
          detailInfoList: 0
        },
        isOpenDetail: null,
        guessList: [],
        appKey: appKey,
        itemToggle: 'detail'

      }
    },
    computed: {
      isWeiXin() {
        return this.$store.state.isWeiXin
      },
    },

    beforeCreate() {
      this.$store.dispatch('setIsHiddenNav', true)
    },
    mounted() {

      this.getItemData();
    },
    beforeDestroy() {
      this.$store.dispatch('setIsHiddenNav', false)
    },

    watch: {
      '$route': function () {
        this.getItemData()
        document.body.scrollTop = 0;
      }
    },
    methods: {
      openDetail() {
        if (typeof this.isOpenDetail !== 'boolean') {
          MtaH5.clickStat('detailpic', {
            'action': 'true'
          })
        }
        this.isOpenDetail = !this.isOpenDetail;
      },
      getItemData() {
        const api = Utils.server() + '/1.0/h5/batch/search'
        const itemId = this.$route.params.itemId
        const params = {
          appKey: appKey,
          data: Utils.stringify({
            "itemDetail": {
              "ids": [itemId]
            },
            "itemRecommend": [{
              "id": itemId
            }]
          })
        };


        this.$http.get(api, {
          params: params
        }).then((response) => {
          const res = JSON.parse(response.body)
          console.log(res)
          this.item = res.data.itemDetailInfoRes.data[0];
          this.guessList = res.data.itemRecommendRes.data[0].itemDTOList;

          // 模拟访问sclick
          // if (!this.isWeiXin) {
          //   var iframe = document.createElement('iframe')
          //   iframe.style.display = 'none'
          //   // iframe.setAttribute('src', this.item.sclickUrl)

          //   var iframeCallback = function () {
          //     setTimeout(function () {
          //       iframe.removeEventListener('load', iframeCallback)
          //       // document.body.removeChild(iframe)
          //     }, 0)
          //   }
          //   iframe.addEventListener('load', iframeCallback)
          //   document.body.appendChild(iframe)
          // }
        })
      },
      bcClick(id, title, url) {
        // 漏斗最后一级事件
        MtaH5.clickStat('daohang', {
          'detail': 'true'
        })
        MtaH5.clickStat('yaofeng', {
          'detail': 'true'
        })
        MtaH5.clickStat('danchuang', {
          'detail': 'true'
        })
        MtaH5.clickStat('lunbo', {
          'detail': 'true'
        })
        MtaH5.clickStat('shouye', {
          'detail': 'true'
        })
        window.BC_SDK.goTaoke({
          tkUrl: url,
        });
      },
      toggleTabs(name, id) {
        this.itemToggle = name;
        if (name === 'comment') {
          MtaH5.clickStat('DetailComment', {
            'id': id
          })
        }
      }
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  $price: #fe2947;
  .page-item-detail {
    padding-bottom: 0.98rem;
    //后退
    //轮播图
    .item-carousel {
      height: 7.5rem;
      background-color: #eee;
      .swiper-container {
        height: 100%;
      }
      .swiper-slide {
        background-size: cover;
      }
      .swiper-pagination-bullet {
        background-color: #bab9ba;
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        background-color: $price;
      }
    }
    //单品信息
    .item-info {
      padding: 0.4rem 0.24rem 0.36rem;
      background-color: #fff;
      margin-bottom: 0.2rem;
      .item-price {
        margin-bottom: 0.34rem;
      }
      .coupon {
        background-color: $price;
        color: #fff;
        border-radius: 2px;
        font-size: 0.24rem;
        padding: 0 0.08rem;
      }
      .sold {
        float: right;
        font-size: 0.26rem;
        color: #999;
        margin-top: 0.28rem;
      }
      .title {
        font-size: 0.3rem;
        color: #444;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 700;
        margin-bottom: 0.24rem;
      }
      .recommended {
        color: #fd723c;
        font-size: 0.26rem;
      }
    }
    .item-tabs {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.3rem;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      a {
        margin: 0 0.6rem;
        padding: 0.2rem 0.1rem;
        &.active {
          color: $price;
          border-bottom: 0.04rem solid $price;
        }
      }
    }
    .item-picture {
      background-color: #fff;
      margin-bottom: 0.2rem;
      text-align: center;
      padding: 0.2rem;
      .open-click {
        font-size: 0.28rem;
        color: $price;
        padding: 0.11rem 0.3rem;
        display: inline-block;
        border: 1px solid $price;
        border-radius: 50px;
      }
    }
    .item-comment-list {
      background-color: #fff;
    }
    .item-comment {
      padding: 0.35rem 0.24rem;
      font-size: 0.26rem;
      border-bottom: 0.01rem solid #eee;
      .buyer {
        color: #666;
        margin-bottom: 0.2rem;
        span {
          float: right;
          color: #aaa;
        }
      }
      .comment {
        font-size: 0.28rem;
        color: #444;
      }
    }
    .item-guess {
      background-color: #fff;
      .guess-title {
        padding: 0.27rem 0;
        text-align: center;
        span {
          color: #999;
          font-size: 0.26rem;
          opacity: 0.8;
          display: inline-block;
          position: relative;
          &::before,
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            top: 0.14rem;
            width: 100%;
            height: 1px;
            background-color: #cacaca;
            opacity: 0.6;
          }
          &::before {
            right: 100%;
            margin-right: 0.1rem;
          }
          &::after {
            left: 100%;
            margin-left: 0.1rem;
          }
        }
      }
      .product-list {
        padding: 0;
        margin-top: 1rem;
      }
      .wrap {
        margin-bottom: 0.1rem;
        .product-info {
          .title {
            white-space: nowrap;
            text-overflow: ellipse;
            display: block;
            min-height: auto;
          }
        }
        &:nth-child(odd) {
          float: left;
          padding-right: 0.05rem;
        }
        &:nth-child(even) {
          float: right;
          padding-left: 0.05rem;
        }
      }
    }
    .item-footer {
      z-index: 100;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 0;
      text-align: right;
      display: flex;
      height: 0.98rem;
      justify-content: flex-end;
      background-color: #fff;
      border-top: 1px solid #eee;
      .actions {
        height: 100%;
        display: flex;
        >div {
          height: 100%;
          margin: 0;
          border: 0;
          vertical-align: baseline;
          font-size: 0.28rem;
          text-align: center;
          color: #fff;
          display: flex;
        }
      }
      .price {
        position: absolute;
        left: 0;
        line-height: 0.98rem;
        img {
          width: 3.2rem;
        }
        .price-name {
          font-size: 0.26rem;
          color: #999;
        }
        .price-num {
          color: $price;
          font-size: 0.32rem;
        }
      }
      .coupon {
        width: 2rem;
        background-color: #fd723c;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .buy {
        width: 2.3rem;
        background-color: $price;
        justify-content: center;
        align-items: center;
      }
    }
  }

</style>
