<template>
  <div class="popup" v-bind:class="{hide: popupShow}">
    <span @click="close()" class="close-btn"></span>
    <div class="popup-content">
      <a @click="skip(popup.skipUrl, popup.id, popup.title)">
        <img :src="popup.picUrl">
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['popupShow', 'appKey', 'adTag'])
    },
    props: {
      popup: {
        type: Object,
        default: {}
      },
      appKey: appKey,
      adTag: adTag
    },
    methods: {
      close () {
        this.$store.commit('setPopupShow', true);
      },
      skip (url, id, title) {
        if (url) {
          this.$router.push({path: url + '?appKey=' + this.appKey + '&ADTAG=' + this.adTag});
        }
        this.doLog(id, title);
        MtaH5.clickStat('Popup',{'name':id.toString()})
      },
      doLog(id, title) {
        MtaH5.clickStat('Popup', { 'popupname': id.toString() })
        MtaH5.clickStat('danchuang',{'popup':'true'})
        // this.open(url)
      },
      open(url) {
        window.BC_SDK.goTaoke({
          tkUrl: url,
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  $close-white: #FFFFFF;
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    .popup-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 5.4rem;
        height: 6.4rem;
      }
    }
    .close-btn {
      display: block;
      width: 0.52rem;
      height: 0.52rem;
      overflow: hidden;
      position: absolute;
      bottom: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      color: $close-white;
    }
    .close-btn::before, .close-btn::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      background: $close-white;
      width: 100%;
      height: 0.02rem;
    }
    .close-btn::before {
      transform: rotate(45deg);
    }
    .close-btn::after {
      transform: rotate(-45deg);
    }
  }
  .hide {
    display: none;
  }
</style>









