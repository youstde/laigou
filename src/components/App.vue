<template>
  <div id="app" :class="{'is-weixin': isShowNotice, 'is-hidden-nav': isHiddenNav}">
    <app-nav></app-nav>
    <BackToTop></BackToTop>
    <router-view keep-alive class="main"></router-view>
    <BottomNav></BottomNav>
    <Cover></Cover>
  </div>
</template>

<script>
  import detector from 'detector'
  import Utils from '@/assets/js/utils'
  import appNav from '@/components/header/nav'
  import BottomNav from '@/components/router/BottomNav'
  import BackToTop from '@/components/router/BackToTop'
  import Cover from '@/components/helper/Cover'

  export default {
    computed: {
      isShowNotice() {
        return this.$store.state.isShowNotice
      },
      isWeiXin() {
        return this.$store.state.isWeiXin
      },
      isHiddenNav() {
        return this.$store.state.isHiddenNav
      },
    },
    data() {
      return {
        serviceData: {},
        nav: [],
        appKey: appKey,
        adTag: adTag
      }
    },
    components: {
      appNav,
      BottomNav,
      BackToTop,
      Cover
    },
    watch: {
      serviceData() {
        this.initNav();
      },
      nav() {
        this.$store.commit('setNavData', this.parseNav(this.nav));
        this.$store.commit('setAppKey', this.appKey);
        this.$store.commit('setAdTag', this.adTag);
      },
      $route: function () {
        this.getServiceData();
      }
    },
    mounted() {
      this.getServiceData();
    },
    created() {
      // this.getServiceData();
      if (detector.browser.micromessenger) {
        if (detector.os.ios) {
          this.$store.commit('SET_ISWEIXIN', {
            iswx: 'ios'
          })
          this.$store.commit('SET_IS_SHOW_NOTICE', {
            iswx: 'ios'
          })
        } else if (detector.os.android) {
          this.$store.commit('SET_ISWEIXIN', {
            iswx: 'android'
          })
          this.$store.commit('SET_IS_SHOW_NOTICE', {
            iswx: 'android'
          })
        } else {
          this.$store.commit('SET_ISWEIXIN', {
            iswx: 'ios'
          })
          this.$store.commit('SET_IS_SHOW_NOTICE', {
            iswx: 'ios'
          })
        }
      } else {
        this.$store.commit('SET_ISWEIXIN', {
          iswx: false
        })
        this.$store.commit('SET_IS_SHOW_NOTICE', {
          iswx: false
        })
      }
    },
    methods: {
      getServiceData() {
        if (this.serviceData.channelsRes) return;
        const _this = this;
        this.$http.get('static/service/service_' + this.appKey + '.json?t=' + new Date().getTime()).then((response) => {
          _this.serviceData = response.body;
          this.$store.commit('setChannelData', _this.serviceData);
        }, (response) => {});
        // mock
        // this.serviceData = require('static/service/service_'+appKey+'.json');
      },
      parseNav(nav) {
        nav.forEach((item, index) => {
          if (item.operationType !== 2) {
            item.url = '/lg/' + item.type + '_id=' + item.id
          }
        })
        return nav;
      },
      hideCover() {
        document.getElementById('cover').style.display = 'none';
      },
      initNav() {
        const _this = this;
        const currentRoute = this.$route.path;
        const data = this.serviceData;
        const channelsRes = Utils.addKey(Utils.getJsonData(data, 'channelsRes'), 'type', 'channel');
        if (channelsRes) {
          const order = 'channel' + channelsRes[0].id;
          const categorysRes = data[order] && Utils.getJsonData(data[order], 'categorysRes');
          if (!!categorysRes) {
            this.nav = channelsRes.concat(Utils.addKey(categorysRes, 'type', 'category'))
          } else {
            this.nav = channelsRes;
          }
          if (currentRoute === '/' || currentRoute === '/lg/index.html') {
            MtaH5.clickStat('shouye', {
              'index': 'true'
            })
            this.$router.replace({
              path: '/lg/channel_id=' + channelsRes[0].id + '?appKey=' + appKey + '&ADTAG=' + adTag
            })
          }
        } else {
          // 发送请求
          const api = Utils.server() + '/1.0/h5/app/home/get?data=&appKey=key_adbaitai';
          this.$http.get(api).then((response) => {
            const result = Utils.parse(response.body);
            if (result.success && result.data) {
              _this.serviceData = result.data;
              _this.initNav();
            } else {
              console.log('服务器推送数据失败，前端拉取默认数据失败！！！');
            }
          })
        }
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    max-width: 900px;
    margin: 0 auto;
    &.is-hidden-nav {
      .app-nav,
      .back-prev {
        display: none;
      }
      .back-top {
        bottom: 1.2rem;
      }
      .main {
        margin-top: 0;
      }
    }
  }

  .main {
    margin-top: 0.88rem;
  }

  .mt16 {
    margin-top: 1.68rem;
  }

  .page {
    background-color: #eee;
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
  }

  img.lazy {
    border: 0;
    background-image: url('../assets/img/loading.jpg');
    background-size: cover;
  }

  #cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0.1rem;
    display: none;
    img {
      width: 100%;
    }
  }

</style>
