<template>
	<div class="page-category">
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
        <span slot="no-results">
          木有商品，看看其他的吧～
        </span>
      </infinite-loading>
    </div>
	</div>
</template>

<script>
  import HalfWidthProduct from '@/components/goods/HalfWidthProduct'
  import InfiniteLoading from 'vue-infinite-loading'
  import Utils from '@/assets/js/utils'
  export default {
    data () {
      return {
        productResult: [],
        productList: [],
        params: {
          itemsByCat: {
            catIds: [],
            offset: 0,
            pageSize: 20
          }
        }
      }
    },
    methods: {
      initConfig () {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        const route = this.$route.params.key.split('_')[1];
        const categoryId = Utils.getQueryString(route, 'id');
        console.log('%c%s', 'color:green;font-size:16px', 'categoryId：' + categoryId);
        console.log('%c%s', 'color:green;font-size:16px', 'appKey：' + appKey);
        this.productResult = [];
        this.productList = [];
        this.params = {
          itemsByCat: {
            offset: 0,
            pageSize: 20,
            catIds: [categoryId]
          }
        }
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
          const itemsByCat = Utils.parse(response.body);
          console.log(itemsByCat);
          if (itemsByCat.success && itemsByCat.data.itemsByCatRes.data && itemsByCat.data.itemsByCatRes.data.length) {
            _this.productResult = Utils.parse(response.body).data.itemsByCatRes.data;
            _this.params.itemsByCat.offset += _this.productResult.length;
            _this.productList.push(..._this.productResult);
            if (_this.productResult.length < _this.params.itemsByCat.pageSize) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        }, (error) => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        })
      }
    },
    watch: {
      '$route' () {
        this.initConfig();
      }
    },
    mounted () {
      this.initConfig();
    },
    components: {
      HalfWidthProduct,
      InfiniteLoading
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .page-category {
    .product-list {
      padding: 0;
      margin-top: 1rem;
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
    }
  }
</style>
