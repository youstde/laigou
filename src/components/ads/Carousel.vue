<template>
  <div class="carousel-swipe">
    <swipe>
      <swipe-item class="slide" v-for="item in carousel" v-bind:data="item" v-bind:key="item.title">
        <!--:href="!!item.skipUrl ? item.skipUrl : 'javascript:void(0);' "-->
        <a href="javascript:void(0);" rel="noreferrer" @click="skip(item.skipUrl, item.id, item.title)">
          <img :src="item.picUrl" alt="">
        </a>
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import 'vue-swipe/dist/vue-swipe.css'
  import {
    Swipe,
    SwipeItem
  } from 'vue-swipe'
  export default {
    computed: {
      ...mapGetters(['appKey', 'adTag']),
    },
    props: {
      carousel: {
        type: Array
      },
      appKey: appKey,
      adTag: adTag
    },
    components: {
      Swipe,
      SwipeItem
    },
    methods: {
      doLog(url, id, title) {
        MtaH5.clickStat('Carousel', {
          'carouselname': id.toString()
        })
        MtaH5.clickStat('lunbo', {
          'carousel': 'true'
        })
      },
      skip(url, id, title) {
        if (url) {
          if (/http/.test(url)) {
            window.open(url)
          } else {
            this.$router.push({
              path: url,
              query: {
                appKey: this.appKey,
                ADTAG: this.adTag
              }
            })
          }
        }
        this.doLog(url, id, title);
      }
    },
    name: 'carousel'
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  .carousel-swipe {
    height: 2.4rem;
    .slide {
      a {
        display: inline-block;
        height: 100%;
        width: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mint-swipe-indicators {
      bottom: 0.2rem;
    }
    .mint-swipe-indicator {
      height: 0.06rem;
      width: 0.08rem;
      margin: 0 0.04rem;
      background-color: #ccc;
      border-radius: 0.03rem;
      opacity: 1;
      &.is-active {
        width: 0.24rem;
        background-color: #7F7F7F;
      }
    }
  }

</style>
