<template>
  <div id="cover">
    <img v-if="isWeiXin === 'ios'" src="../../assets/img/taokey_ios.png" alt="">
    <img v-if="isWeiXin === 'android'" src="../../assets/img/taokey_android.png" alt="">
    <input id="copyTarget" v-model="taoKey" readonly />
    <button class="copyBtn" data-clipboard-target="#copyTarget">一键复制</button>
    <button class="close-btn" @click="hideCover()"></button>
  </div>
</template>
<script>
  import Clipboard from 'Clipboard'

  export default {
    computed: {
      isWeiXin() {
        return this.$store.state.isWeiXin
      },
      taoKey() {
        return this.$store.state.taoKey
      }
    },
    mounted() {
      var clipboard = new Clipboard('.copyBtn')
			const self = this
      clipboard.on('success', function (e) {
        alert('淘口令复制成功！')
				MtaH5.clickStat("detailtaokey")
				self.hideCover();
      });
    },
    methods: {
      hideCover() {
        document.getElementById('cover').style.display = 'none';
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss">
  #cover {
    padding: 0.1rem 0.4rem;
    #copyTarget {
      position: absolute;
      top: 5.3rem;
      width: 4.6rem;
      left: 50%;
      margin-left: -2.3rem;
      border: none;
      text-align: center;
      font-size: 0.32rem;
      background-color: transparent;
    }

    .copyBtn {
      position: absolute;
      top: 6.25rem;
      width: 4.5rem;
      height: 0.78rem;
      left: 50%;
      margin-left: -2.25rem;
      border: 1px solid #000;
      border-radius: 5rem;
      opacity: 0;
    }
    .close-btn {
      display: block;
      width: 0.52rem;
      height: 0.52rem;
      overflow: hidden;
      position: relative;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 50%;
      padding: 0.3rem;
      background-color: transparent;
			margin: 0 auto;
			margin-top: 0.8rem;
    }
    .close-btn::before,
    .close-btn::after {
      position: absolute;
      content: '';
      top: 50%;
      left: 10%;
      background: #fff;
      width: 80%;
      height: 0.02rem;
    }
    .close-btn::before {
      transform: rotate(45deg);
    }
    .close-btn::after {
      transform: rotate(-45deg);
    }
  }

</style>
