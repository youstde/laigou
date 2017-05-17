<template>
  <div class="nav app-nav">
    <div class="search-entry" @click="doSearch()" href="javascript:void(0);"></div>
    <!--<div class="notice" v-if="isShowNotice">
      <img v-if="isShowNotice==='ios'" src="../../assets/img/notice_ios.png" width="100%">
      <img v-if="isShowNotice==='android'" src="../../assets/img/notice_android.png" width="100%">
      <svg class="close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" @click="hideNav()">
        <path d="M184.64768 836.34176c3.9936 3.9936 9.23648 5.98016 14.47936 5.98016 5.24288 0 10.48576-2.00704 14.49984-6.00064l292.70016-293.04832 292.70016 293.04832c3.9936 4.01408 9.23648 6.00064 14.49984 6.00064 5.24288 0 10.48576-2.00704 14.47936-5.98016 8.00768-7.9872 8.00768-20.95104 0.02048-28.95872L535.61344 514.64192 828.0064 221.92128c7.9872-8.00768 7.9872-20.97152-0.02048-28.95872-8.02816-8.00768-20.97152-8.00768-28.95872 0.02048L506.30656 486.03136 213.6064 192.98304c-8.00768-8.00768-20.97152-8.00768-28.95872-0.02048-8.00768 7.9872-8.00768 20.95104-0.02048 28.95872l292.37248 292.72064L184.6272 807.38304C176.64 815.37024 176.64 828.35456 184.64768 836.34176z"
              p-id="2016"></path>
      </svg>
      <svg class="arrow" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M1023.97952 514.7904L512 0 0.02048 514.7904h301.32736v421.37088h421.30944v-421.37088h301.32224z" p-id="1006"></path>
      </svg>
    </div>-->
    <nav>
      <a @click="doLog(item.name, item.url)" v-for="item in nav.data" :key="item.name" :class="{'router-link-active': activeLink.includes(item.url)}">{{item.name}}</a>
    </nav>
  </div>
</template>

<script>
  import changeTitle from '@/assets/js/changeTitle'
  import {
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['nav', 'appKey', 'adTag']),
      isShowNotice() {
        return this.$store.state.isShowNotice;
      }
    },
    data() {
      return {
        activeLink: ''
      }
    },
    watch: {
      '$route': function () {
        this.activeLink = this.$route.path;
      }
    },
    mounted() {
      this.activeLink = this.$route.path;
    },
    methods: {
      doSearch () {
        this.$router.push({
          name: 'search',
          query: {
            appKey: this.appKey,
            ADTAG: this.adTag
          }
        })
      },
      doLog(name, url) {
        MtaH5.clickStat('Navigation', {
          'n': name
        })
        MtaH5.clickStat('daohang', {
          'navigation': 'true'
        })
        mlinkTrack.sendEvent({
          a: name
        })

        if (/http/.test(url)) {
          window.location.assign(url)
        } else {
          this.$router.push({
            path: url,
            query: {
              appKey: this.appKey,
              ADTAG: this.adTag
            }
          })
        }

      },
      hideNav() {
        this.$store.commit('SET_IS_SHOW_NOTICE', {
          iswx: false
        })
      }
    },
    name: 'nav'
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $pink: #ff2a48;
  $nav-zindex: 1000;
  .search-entry {
    width: 100%;
    height: 1rem;
    background: #FFF url('//cowcdn.oss-cn-hangzhou.aliyuncs.com/lg/img/search-bg.png') 0 0 no-repeat;
    background-size: cover;
    display: block;
  }
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: $nav-zindex;
    .notice {
      position: relative;
      img {
        margin: 0;
        display: block;
      }
      .arrow {
        width: 0.34rem;
        position: absolute;
        right: 0.3rem;
        top: 0.2rem;
        fill: #fff;
        animation: arrow 1s ease infinite;
      }
      .close {
        width: 0.34rem;
        position: absolute;
        left: 0.2rem;
        top: 0.22rem;
        fill: #fff;
      }
    }
    nav {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      height: 0.88rem;
      padding: 0 0.1rem;
      background-color: #fff;
      /*justify-content: center;*/
      border-bottom: 0.5px solid #e6e6e6;
    }
    a {
      font-size: 0.3rem;
      color: #333;
      flex-shrink: 0;
      line-height: 0.88rem;
      margin: 0 0.2rem;
      text-decoration: none;
    }
    a:last-child {
      padding-right: 0.2rem;
    }
    a.router-link-active {
      color: $pink;
      border-bottom: 0.04rem solid $pink;
    }
    @keyframes arrow {
      0% {
        margin-top: 0;
      }
      25% {
        margin-top: -0.05rem;
      }
      50% {
        margin-top: 0;
      }
      75% {
        margin-top: 0.05rem;
      }
      100% {
        margin-top: 0;
      }
    }
  }

</style>
