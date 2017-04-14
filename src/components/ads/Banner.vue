<template>
  <div class="banner">
    <div class="banner-item" v-for="item in banner">
      <a @click="skip(item.skipUrl, item.id, item.title)">
        <img :src="item.picUrl" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['appKey', 'adTag']),
    },
    props: {
      banner: {
        type: Array,
        default: []
      },
      appKey: appKey,
      adTag: adTag
    },
    methods: {
      skip(url, id, title) {
        if (url) {
          this.$router.push({path: url + '?appKey=' + this.appKey + '&ADTAG=' + this.adTag});
        }
        this.doLog(id, title);
      },
      doLog(id, title) {
        MtaH5.clickStat('Banner', { 'bannername': id.toString()})
        MtaH5.clickStat('yaofeng', {'banner':'true'})
      },
      open(url) {
        window.BC_SDK.goTaoke({
          tkUrl: url,
        });
      }
    },
    name: 'banner'
  }
</script>

<style lang="scss" scoped>
  .banner {
    background-color: #F5F5F5;
    .banner-item {
      height: 2rem;
      margin-top: 0.2rem;
      a {
        display: inline-block;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
