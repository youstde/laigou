<template>
  <div class="page-normal">
    <inner-banner v-if="innerBanner" :innerBanner="innerBanner"></inner-banner>
    <div class="topic-title-box">
      <topic-title-normal :topicTitle="topicTitle" :countTime="rest"></topic-title-normal>
      <count-down v-show="showRest" :countTime="rest" :showDays="true"></count-down>
    </div>
    <div class="product-list clearfix">
      <HalfWidthProduct
        :product="product"
        v-for="product in productList"
        v-bind:data="product"
        v-bind:key="product.title"
      ></HalfWidthProduct>
      <infinite-loading :on-infinite="getList" ref="infiniteLoading" spinner="waveDots">
        <span slot="no-more">
          到底啦，看看其他的吧～
        </span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  import HalfWidthProduct from '@/components/goods/HalfWidthProduct'
  import CountDown from '@/components/goods/topic/item/CountDown'
  import TopicTitleNormal from '@/components/goods/topic/titles'
  import InnerBanner from '@/components/goods/topic/banner'
  import InfiniteLoading from 'vue-infinite-loading'
  import Utils from '@/assets/js/utils'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
      	topicTitle: '',
        innerBanner: '',
        rest: 0,
        showRest: false,
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
    mounted () {
      this.initConfig();
    },
    watch: {
      '$route' () {
        this.initConfig();
        this.getList();
      }
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
          _params = {
            topics: [{
              id: _topicId,
              offset: 0,
              pageSize: 20
            }]
          }
        }
        this.rest = 0;
        this.innerBanner = '';
        this.productResult = [];
        this.productList = [];
        this.params = _params;
      },
      getList () {
        const _server = Utils.server();
        const _this = this,
          api = _server + '/api/1.0/h5/batch/search',
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
    },
    components: {
      TopicTitleNormal,
      HalfWidthProduct,
      InfiniteLoading,
      InnerBanner,
      CountDown
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .page-normal {
    background-color: #eee;
    .topic-title-box {
      padding: .14rem 0;
      text-align: center;
      background-color: #fff;
      margin-bottom: .2rem;
    }
    .product-list {
      padding: 0;
      margin-top: 0.2rem;
    }
  }
  .wrap {
    margin-bottom: 0.1rem;
    &:nth-child(odd) {
      float: left;
      padding-right: 0.05rem;
    }
    &:nth-child(even) {
      float: right;
      padding-left: 0.05rem;
    }
    .half-width {
      background-color: #fff;
      position: relative;
      display: block;
      width: 3.7rem;
    }
  }
</style>
