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
  import shl from '@/assets/js/sha'

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
        this.initWXShare();
      }
    },
    mounted() {
      // window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa8b4275880355a7&redirect_uri=https%3a%2f%2fwx.adbaitai.com%2fwxpage%2findex.html&response_type=code&scope=snsapi_userinfo#wechat_redirect');
      this.getServiceData();
      this.haveStorgeOpenId();
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
      initWXShare () {
          let This = this;
          const api = Utils.server() + '/api/public/weixin/getTickets';
          this.$http.get(api).then((response) => {
            const result = response.body;
            let ticket = result;
            let noncestr = 'Wm3WZYTPz0wzccnW',
              timestamp = Date.now(),
              sturl = window.location.href,
              stringOne = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${sturl}`,
              signaturett = shl.hex_sha1(stringOne);
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              // appId: 'wxfa8b4275880355a7', // 必填，公众号的唯一标识
              appId: 'wxfa8b4275880355a7', // 必填，公众号的唯一标识
              timestamp: timestamp, // 必填，生成签名的时间戳
              nonceStr: noncestr, // 必填，生成签名的随机串
              signature: signaturett,// 必填，签名，见附录1
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
              let storage = window.localStorage;
              // alert(JSON.stringify(storage))
              let openId = storage.getItem("openId"),
                  shareUrl = window.location.href.replace('&type=gzh', ''),
                  codeObj = Utils.getQueryString(shareUrl, 'code'),
                  newCodeObj = '&code=' + codeObj;
                  shareUrl = shareUrl.replace(newCodeObj, '');
              // alert('ready')
              wx.onMenuShareTimeline({
                title: '分享好货优惠券', // 分享标题
                link:  shareUrl + '&openId='+ openId, // 分享链接
                imgUrl: 'https://static.adbaitai.com/Website/Img/lgShareIcon.png', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
              });
              // onMenuShareAppMessage
              wx.onMenuShareAppMessage({
                title: '分享好货优惠券', // 分享标题
                link:  shareUrl + '&openId='+ openId, // 分享链接
                imgUrl: 'https://static.adbaitai.com/Website/Img/lgShareIcon.png', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数

                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
              });
            });
          });

      },
      haveStorgeOpenId () {
          if(this.isGzh()) {
            // alert('gzh')
            // 公众号
            if(this.checkCode()) {
              // alert('isGzh&&checkCode');
              let code = this.getUrlOption(1);
              // alert('isGzh&&checkCode&&getUrlOption');
              this.checkBindSend({
                  "code": code
              });
            }else {
              this.getLocalStorage();
            }
          }
          if(this.checkOpenId()) {
            // 分享链接
            if(!this.checkCode()) {
              // alert(2)
              this.getLocalStorage(1);
            }else {
              // 带code
                let optionObj = this.getUrlOption(2);
                this.checkBindSend({
                    "code": optionObj.code,
                    "mpOpenId": optionObj.mpOpenId
                });

              // this.setLocalStorage();
            }
          }


      },
      encodeUrl () {
        let url = window.location.href;
        return encodeURIComponent(url);
      },
      getLocalStorage (type) {
        let storage = window.localStorage;
        // alert(JSON.stringify(storage))
        let openId = storage.getItem("openId");
        if(openId) {
          this.checkBindSend({
            "selfMpOpenId": openId,
            "mpOpenId": Utils.getQueryString(location.href, 'openId')
          });
          // alert(openId);

        }else {
          let url = this.encodeUrl();
          // alert(url);
          window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa8b4275880355a7&redirect_uri='+url+'&response_type=code&scope=snsapi_userinfo#wechat_redirect');

        }
      },
      checkBindSend (params) {
        const api = Utils.server() + '/api/public/h5/weixin/checkBindAgent';
       this.$http.get(api, {
         params: {
           data: Utils.stringify(params)
         }
       }).then(function(response){
           // 响应成功回调
          //  alert(response.body);
           let data = JSON.parse(response.body);
           if(data.success){
             let openId = data.data.mpOpenId;
             window.localStorage.setItem("openId", openId);
           }
       }, function(response){
           // 响应错误回调
           alert(response);
       });
      },
      setLocalStorage (openId) {
        window.localStorage.setItem('openId', openId);
      },
      checkCode () {
        var searchObj =  window.location.search.substr(1),
            searchArr = searchObj.split('&'),
            isCode = false;
        for(var i =0; i< searchArr.length; i++) {
          if(searchArr[i].indexOf('code')> -1) {
            isCode = true;
          }
        }
        return isCode;
      },
      isGzh () {
        if (Utils.getQueryString(location.href, 'type') === 'gzh') {
          return true;
        }
        return false;
        // 判断链接是否是公众号中的
        // var searchObj =  window.location.search.substr(1),
        //     searchArr = searchObj.split('&'),
        //     isgzh = false;
        // for(var i =0; i< searchArr.length; i++) {
        //   if(searchArr[i].indexOf('type')> -1) {
        //     let data = searchArr[i].split('=')[1];
        //     if(data == 'gzh') {
        //       isgzh = true;
        //     }
        //   }
        // }
        // return isgzh;
      },
      checkRedirect () {
        // 是否是重定向的链接
      },
      checkOpenId () {

        // var searchObj =  window.location.search.substr(1),
        //     searchArr = searchObj.split('&'),
        //     openId = false;
        // for(var i =0; i< searchArr.length; i++) {
        //   if(searchArr[i].indexOf('openId')> -1) {
        //     openId = true;
        //   }
        // }
        // return openId;
        if (Utils.getQueryString(location.href, 'openId')) {
          return true;
        }
        return false;
      },
      getUrlOption (type) {
        if(type == 1) {
          return Utils.getQueryString(location.href, 'code');
        }else {
          return {
            code: Utils.getQueryString(location.href, 'code'),
            mpOpenId: Utils.getQueryString(location.href, 'openId')
          }
        }
        // var searchObj =  window.location.search.substr(1),
        //     searchArr = searchObj.split('&'),
        //     codeobj = '',
        //     openId = '';
        // for(var i =0; i< searchArr.length; i++) {
        //   if(searchArr[i].indexOf('code')> -1) {
        //     codeobj = searchArr[i].split('=')[1];
        //   }
        //   if(searchArr[i].indexOf('openId')> -1) {
        //     openId = searchArr[i].split('=')[1];
        //   }
        // }
        // if(type == 1) {
        //   return codeobj;
        // }else if(type == 2){
        //   return {
        //     code: codeobj,
        //     openId: openId
        //   }
        // }
      },
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
          const api = Utils.server() + '/api/1.0/h5/app/home/get?data=&appKey=key_adbaitai';
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

        this.initWXShare();
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    max-width: 900px;
    margin: 0 auto;
    height: 100%;
    min-height: 100%;
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
    margin-top: 1.88rem;
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
