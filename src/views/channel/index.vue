 <template>
	<div class="page-home">
		<Carousel v-if="carousel.length > 0" :carousel="carousel"></Carousel>
		<Banner v-if="banner.length > 0" :banner="banner"></Banner>
		<Popup v-if="this.$route.params.key === 'channel_id=1' && popup.picUrl" :popup="popup"></Popup>
    <!-- <img v-if="this.showType === 'promotion'" src="../../assets/img/10clock.jpg" alt="" width="100%"> -->
		<!--<PromotionTitle :promotionTitle="promotionTitle" v-if="this.showType === 'promotion'"></PromotionTitle>-->
    <Square v-if='square.length > 0 && currentTab === "channel_id=1"' :square = "square"></Square>
		<div class="product-list clearfix" v-if="this.showType === 'promotion'">
			<div v-for="product in productList">
				<FullWidthProduct v-if="product.type === 1" :product="product.item"></FullWidthProduct>
				<div v-if="product.type === 2">
					<OutBanner v-if="product.topic.frontType === 1" :outBanner="product.topic"></OutBanner>
					<FullWidthProductChannel v-if="product.topic.frontType === 2" :product="product.topic.item" :id="product.topic.id" :count="product.topic.count"></FullWidthProductChannel>
				</div>
			</div>
			<infinite-loading :on-infinite="getList" ref="infiniteLoading" spinner="waveDots">
	        <span slot="no-more">
	          到底啦，看看其他的吧～
	        </span>
          <span slot="no-results">
            木有商品，看看其他的吧～
          </span>
    	</infinite-loading>
    </div>
    <div class="page-category product-list clearfix" v-if="this.showType === 'itemsByCat'">
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
	import Carousel from '@/components/ads/Carousel'
	import Banner from '@/components/ads/Banner'
	import Popup from '@/components/ads/Popup'
	import Square from '@/components/ads/Square'
	import PromotionTitle from '@/components/goods/item/PromotionTitle'
  import FullWidthProductChannel from '@/components/goods/FullWidthProductChannel'
	import FullWidthProduct from '@/components/goods/FullWidthProduct'
  import HalfWidthProduct from '@/components/goods/HalfWidthProduct'
	import OutBanner from '@/components/goods/item/OutBanner'
	import InfiniteLoading from 'vue-infinite-loading'
	import Utils from '@/assets/js/utils'
    import changeTitle from '@/assets/js/changeTitle'

	import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['currentTab'])
    },
    data () {
      return {
      	channel: {},
        showType: '',
        carousel: [],
        banner: [],
        popup: {},
        square:[],
        promotionTitle: '',
        productResult: [],
        productList: [],
        proParams: {
          promotions: [{
            id: '',
            offset: 0,
            pageSize: 20
          }]
        },
        itemParams: {
          itemsByCat: {
            catIds: [],
            offset: 0,
            pageSize: 20
          }
        }
      }
    },
    mounted () {
      this.initConfig();
    },
    created () {
      const _this = this;
      this.initConfig();
      this.$http.get('static/service/service_' + appKey + '.json?t=' + new Date().getTime()).then((response) => {
        _this.channel = response.body;
      }, (response) => {
      });
      // mock
      // this.channel = require('static/service/service_'+ appKey +'.json');
    },
    watch: {
		  'channel' () {
        this.initView();
      },
      '$route' () {
		  	this.initConfig();
		  	this.initView();
      }
    },
    methods: {
      initConfig () {
        const route = this.$route.params.key.split('_')[1];
        const id = Utils.getQueryString(route, 'id');
        this.showType = '';
        this.carousel = [];
        this.banner = [];
        this.popup = {};
        this.promotionTitle = '';
        this.productResult = [];
        this.productList = [];
        this.proParams = {
          promotions: [{
            id: id,
            offset: 0,
            pageSize: 20
          }]
        };
        this.itemParams = {
          itemsByCat: {
            catIds: [],
            offset: 0,
            pageSize: 20
          }
        };
      },
      initView () {
        this.$nextTick(function () {
          const _serviceData = this.channel['channel' + this.proParams.promotions[0].id];
          let _productResult;
          if (_serviceData.promotionRes) {
            _productResult = _serviceData.promotionRes.data[0];
            this.showType = 'promotion';
            this.productList = _productResult.bizs;
            this.promotionTitle = _productResult.title;
            this.proParams.promotions[0].offset = this.productList.length;
            this.proParams.promotions[0].id = _productResult.id;
          } else if (!_serviceData.promotionRes && _serviceData.itemsByCatRes) {
            _productResult = _serviceData.itemsByCatRes;
            this.productList = _productResult.data;
            this.itemParams.itemsByCat.offset = this.productList.length;
            this.itemParams.itemsByCat.catIds =_productResult.params.catIds;
            this.showType = 'itemsByCat'
          } else {
            document.querySelector('.page-home').innerHTML = '<div style="font-size: 0.28rem; text-align: center; padding: 0.3rem 0; color: #666;">木有商品，看看其他的吧～</div>';
          }

          this.initAds(_serviceData);
        });
      },
      initAds (data) {
      	const _this = this;
        if (data.adsRes && data.adsRes.data && data.adsRes.data.length) {
          const ads = data.adsRes.data;
          ads.forEach(function (item, index) {
          	if (item.banners && item.banners.length) {
          		if (item.type === 0) {
                _this.carousel = item.banners;
              } else if (item.type === 1) {
                _this.popup = item.banners[0];
              } else if (item.type === 2) {
                _this.banner = item.banners;
              } else if(item.type === 3){
                _this.square = item.banners;
              }
            }
          });
        }
      },
      getList () {
        let p;
        if (this.showType === 'promotion') {
          p = this.proParams;
        }
        if (this.showType === 'itemsByCat') {
          p = this.itemParams;
        }
        const _server = Utils.server();
        const _this = this,
          api =  _server + '/1.0/h5/batch/search',
          params = {
            appKey: appKey,
            data: Utils.stringify(p)
          };
        this.$http.get(api, {
          params: params
        }).then((response) => {
          if (this.showType === 'promotion') {

            _this.productResult = Utils.parse(response.body).data.promotionRes.data[0];

            if (!Utils.parse(response.body).data.promotionRes.success) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              return false;
            }

            _this.proParams.promotions[0].offset += _this.productResult.bizs.length;
            _this.productList.push(..._this.productResult.bizs);
            if (_this.productResult.bizs.length < _this.proParams.promotions[0].pageSize) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          }
          if (this.showType === 'itemsByCat') {
            const itemsByCat = Utils.parse(response.body);
            if (itemsByCat.success && itemsByCat.data.itemsByCatRes.success) {
              _this.productResult = Utils.parse(response.body).data.itemsByCatRes.data;
              _this.itemParams.itemsByCat.offset += _this.productResult.length;
              _this.productList.push(..._this.productResult);
              if (_this.productResult.length < _this.itemParams.itemsByCat.pageSize) {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              }
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            } else {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          }
        }, (error) => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        });
      }
    },
    components: {
      Carousel,
      Banner,
      Popup,
      Square,
      PromotionTitle,
      FullWidthProduct,
      FullWidthProductChannel,
      HalfWidthProduct,
      OutBanner,
      InfiniteLoading
    }
  }
</script>

<style lang="scss" scoped>
	.page-home {
		margin-top: 0.88rem;
	}
  .product-list {
    margin-top: 0.2rem;
  }
  .page-category {
    padding: 0;
    margin-top: 0.2rem;
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
