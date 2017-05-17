<template>
  <div class="page-low-price" :style="styleObj.bgColor">
    <inner-banner v-if="innerBanner" :innerBanner="innerBanner"></inner-banner>
    <div class="topic-title-box">
      <topic-title :topicTitle="topicTitle" :countTime="rest"></topic-title>
      <count-down-coupon v-show="showRest" :styleObj="styleObj" :countTime="rest" :count="100"></count-down-coupon>
    </div>
    <div class="product-list clearfix">
      <coupon-item-price
        :product="product"
        v-for="product in productList"
        v-bind:data="product"
        v-bind:key="product.title"
      ></coupon-item-price>
      <infinite-loading :on-infinite="getList" ref="infiniteLoading" spinner="waveDots">
        <span slot="no-more">
          到底啦，看看其他的吧～
        </span>
        <span slot="no-results">
          木有数据啦，看看其他的吧～
        </span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  import CountDownCoupon from '@/components/goods/topic/item/CountDownCoupon'
  import CouponItemPrice from '@/components/goods/topic/itemPrice'
  import InnerBanner from '@/components/goods/topic/banner'
  import TopicTitle from '@/components/goods/topic/title'
  import InfiniteLoading from 'vue-infinite-loading'
  import Utils from '@/assets/js/utils'
  import { mapGetters } from 'vuex'

  export default {
    // computed: {
    //   ...mapGetters(['appKey'])
    // },
  	components: {
      CountDownCoupon,
      CouponItemPrice,
      InfiniteLoading,
      InnerBanner,
      TopicTitle
    },
  	data () {
  		return {
  			topicTitle: '',
  			innerBanner: '',
        rest: 0,
        showRest: false,
        styleObj: {
          bgColor: {
            backgroundColor: '#eee'
          },
          clock: {
            backgroundColor: '#421308'
          },
          ms: {
            backgroundColor: '#FFB931'
          }
        },
        productResult: [],
        productList: [],
        params: {
          topics: [{
            id: '',
            offset: 0,
            pageSize: 20
          }]
        }
      }
    },
    watch: {
      '$route' () {
        this.initConfig();
        this.getList();
      }
    },
    mounted () {
    	this.initConfig();
    },
    methods: {
    	initConfig () {
        const route = this.$route.params.key.split('_')[1];
        const _promotionId = Utils.getQueryString(route, 'promotionId');
        const _topicId = Utils.getQueryString(route, 'topicId');
        this.rest = 0;
        this.showRest = false;
        let _params = null;
        if (_promotionId) {
          _params = {
            topics: [{
              promotionId: _promotionId,
              id: _topicId,
              offset: 0,
              pageSize: 20
            }]
          }
        } else {
        	_prams = {
            topics: [{
              id: _topicId,
              offset: 0,
              pageSize: 20
            }]
          }
        }
        this.topicTitle = '';
        this.innerBanner = '';
        this.showRest = false;
        this.rest = 0;
        this.productResult = [];
        this.productList = [];
        this.params = _params;
      },
  		getList () {
        const _server = Utils.server();
  			const _this = this,
          api =  _server + '/api/1.0/h5/batch/search',
          params = {
            appKey: appKey,
            data: Utils.stringify(this.params)
          };
        this.$http.get(api, {
          params: params
        }).then((response) => {
        	const _topic = Utils.parse(response.body);
        	if (_topic.success && _topic.data.topicRes.success) {
            const topic = Utils.parse(response.body).data.topicRes.data[0];
            _this.topicTitle = topic.title;
            _this.innerBanner = topic.innerBanerUrl;
            _this.rest = topic.showRest ? topic.rest : 0;
            _this.showRest = topic.showRest;
            _this.productResult = topic.items;
            _this.params.topics[0].offset += topic.items.length;
            _this.productList.push(..._this.productResult);
            _this.styleObj = {
              bgColor: {
                backgroundColor: topic.backgroundColor
              },
              clock: {
                backgroundColor: topic.clockColor
              },
              ms: {
                backgroundColor: topic.msClockColor
              }
            };
            if (_this.productResult.length < _this.params.topics[0].pageSize) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        }, (error) => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-low-price {
    background-color: #FB2EBE;
    .topic-title-box {
      font-size: 0.26rem;
      text-align: center;
    }
    .product-list {
      padding: 0.2rem 0.2rem 0 0.2rem;
    }
    .coupon-wrap {
      margin-bottom: 0.1rem;
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
</style>
