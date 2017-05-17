<template>
  <div class="page-search">
    <div class="page-header">
      <span class="search-layer">
        <span class="search-icon"></span>
        <input class="page-input" v-model="keyWord" placeholder="输入关键词搜索商品" type="text" />
        <a href="javascript:void(0);" class="clear-word" @click="clearSearch()" v-show="!!keyWord.length"></a>
      </span>
      <a class="search-btn" href="javascript:void(0);" @click="doSearch()">搜索</a>
    </div>
    <div class="history-search" v-show="showKeyWord">
      <div class="title">
        <span class="history-icon"></span>
        历史搜索
      </div>
      <div class="history-list" >
        <span v-for="item in historyList" @click="doHistorySearch(item)" ref="historyItem">{{item}}</span>
      </div>
    </div>
    <div class="hot-search" v-show="showKeyWord">
      <div class="title">
        <span class="hot-icon"></span>
        热门搜索
      </div>
      <div class="hotSearch-list">
        <span v-for="item in hotSearchList" @click="doHotSearch(item)">{{item}}</span>
      </div>
    </div>
    <div class="page-list">
      <div v-for="product in productList">
        <FullWidthProduct :product="product"></FullWidthProduct>
      </div>
      <infinite-loading :on-infinite="fetchList" ref="infiniteLoading" spinner="waveDots" v-show="showLoading">
	      <span slot="no-more">到底啦，看看其他的吧～</span>
        <span slot="no-results" class="no-search">
          <img src="//cowcdn.oss-cn-hangzhou.aliyuncs.com/lg/img/no-search.png" alt="">
          <span>没有搜索到结果~</span>
        </span>
    	</infinite-loading>
    </div>
    <detail-back-nav></detail-back-nav>
  </div>
</template>
<script>
  import FullWidthProduct from '@/components/goods/FullWidthProduct'
  import DetailBackNav from '../../components/router/DetailBackNav'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
  	components: {
      FullWidthProduct,
      InfiniteLoading,
      DetailBackNav
    },
    beforeCreate() {
      this.$store.dispatch('setIsHiddenNav', true)
    },
    beforeDestroy() {
      this.$store.dispatch('setIsHiddenNav', false)
    },
    data () {
      return {
        offset: 0,
        keyWord: '',
        pageSize: 20,
        productList: [],
        historyList: [], // 搜索历史列表
        hotSearchList: [], // 热门搜索列表
        showKeyWord: true,
        showLoading: false
      }
    },
    watch: {

    },
    mounted () {
      this.requestHotKeyWord();
      this.setSearchHistory();
    },
    methods: {
      // 加载热门搜索
      requestHotKeyWord () {
        const self = this;
        this.$http.get('/api/public/1.0/h5/weixin/hot?data=')
          .then((response) => {
            const jsonData = JSON.parse(response.body);
            if (jsonData.success && jsonData.data && jsonData.data.hotSearch) {
              self.hotSearchList = jsonData.data.hotSearch;
            }
          }, (error) => {

          })
      },
      // 设置搜索历史
      setSearchHistory (key) {
        const self = this;
        let historyList = null;
        if (key) {
          // 如果传入新搜索key 获取缓存中的搜索历史
          // 控制搜索历史在6个并将新的key放在第一个位置
          historyList = localStorage.getItem('lgSearchHistory');
          if (historyList) {
            let newHistory = historyList.split(',').filter(value => value !== key).slice(0, 9);
            newHistory.unshift(key);
            this.historyList = newHistory;
            localStorage.setItem('lgSearchHistory', newHistory);
          } else {
            localStorage.setItem('lgSearchHistory', [key]);
          }
        } else {
          // 如果没有key传入 则为加载历史
          const historyList = localStorage.getItem('lgSearchHistory');
          if (historyList) {
            this.historyList = historyList.split(',');
          }
        }
      },
      // 历史搜索
      doHistorySearch (keyWord) {
        this.productList = [];
        this.keyWord = keyWord;
        this.doSearch();
      },
      // 热门搜索
      doHotSearch (keyWord) {
        this.productList = [];
        this.keyWord = keyWord;
        this.doSearch();
      },
      // 清空搜索
      clearSearch () {
        this.keyWord = '';
        this.showLoading = false;
        this.showKeyWord = true;
        this.productList = [];
      },
      doSearch () {
        console.log('keyWord:' + this.keyWord)
        if (!this.keyWord) return;
        this.showKeyWord = false;
        this.offset = 0;
        this.productList = [];
        this.fetchList();
        this.setSearchHistory(this.keyWord);
      },
      fetchList () {
        if (!this.keyWord) return;
        const self = this;
        const data = JSON.stringify({
          keyWord: this.keyWord,
          offset: this.offset,
          pageSize: this.pageSize
        });
        this.showLoading = true;
        this.$http.get('/api/public/1.0/h5/weixin/searchByKeyWord?data=' + encodeURI(data))
          .then((response) => {
            let items = [];
            const jsonData = JSON.parse(response.body);
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            if (jsonData.success && jsonData.data && jsonData.data.itemsByKeyRes && jsonData.data.itemsByKeyRes.data) {
              items = jsonData.data.itemsByKeyRes.data;
              self.productList = [...self.productList, ...items];
              self.offset += items.length;
              if (!items.length) {
                self.showKeyWord = false;
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                return;
              }
              if (items.length < self.pageSize) {
                self.showKeyWord = false;
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                return;
              }
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            } else {
              self.showKeyWord = false;
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          }, (error) => {
            self.showKeyWord = false;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            console.log(error)
          })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .page-search {
    background-color: #FFF;
    padding-top: 1rem;
    height: 100%;
    .detail-prev {
      top: inherit;
      bottom: 0.4rem !important;
    }
    .page-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: #FFF;
      z-index: 9999;
      height: 1rem;
      line-height: 1rem;
      padding: 0 0.25rem;
      border-bottom: 1px solid #eeeeee;
      .search-layer {
        position: relative;
        .search-icon {
          width: 0.26rem;
          height: 0.27rem;
          top: 50%;
          left: 0.18rem;
          position: absolute;
          transform: translateY(-50%);
          display: inline-block;
          background: #F5F5F5 url('//cowcdn.oss-cn-hangzhou.aliyuncs.com/lg/img/search.png') 0 0 no-repeat;
          background-size: cover;
        }
        .page-input {
          padding-left: 0.6rem;
          width: 6rem;
          border-radius: 0.1rem;
          background-color: #F5F5F5;
          border: none;
          height: 0.7rem;
          outline: none;
        }
        .clear-word {
          position: absolute;
          display: inline-block;
          right: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0.3rem;
          height: 0.3rem;
          background: url('//cowcdn.oss-cn-hangzhou.aliyuncs.com/lg/img/close.png') 0 0 no-repeat;
          background-size: cover;
        }
      }
      .search-btn {
        margin-left: 0.15rem;
        color: #ff3747;
        font-size: 0.32rem;
        position: absolute;
      }
    }
    .history-search, .hot-search {
      .title {
        padding-bottom: 0.25rem;
        font-size: 0.28rem;
        color: #999;
        .hot-icon {
          background: url('//cowcdn.oss-cn-hangzhou.aliyuncs.com/lg/img/search-hot.png') 0 0 no-repeat;
          background-size: cover;
          display: inline-block;
          width: 0.23rem;
          height: 0.29rem;
          vertical-align: top;
        }
        .history-icon {
          background: url('//cowcdn.oss-cn-hangzhou.aliyuncs.com/lg/img/search-time.png') 0 0 no-repeat;
          background-size: cover;
          display: inline-block;
          width: 0.27rem;
          height: 0.27rem;
          vertical-align: top;
        }
      }
      .history-list, .hotSearch-list {
        span {
          font-size:0.28rem;
          color: #666;
          border-radius: 0.1rem;
          background-color: #f0f2f4;
          display: inline-block;
          padding: 0.15rem 0.3rem;
          margin-right: 0.15rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .history-search {
      padding: 0.35rem 0.25rem 0 0.25rem;
    }
    .hot-search {
      padding: 0.5rem 0.25rem 1.45rem 0.25rem;
    }
    .no-search {
      width: 2.66rem;
      height: 1.74rem;
      margin-top: 0.85rem;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        display: block;
        padding-top: 0.5rem;
      }
    }
  }
</style>
