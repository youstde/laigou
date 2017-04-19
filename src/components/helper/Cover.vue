<template>
  <div id="cover">
    <img v-if="isWeiXin === 'ios'" src="../../assets/img/taokey_ios.png" alt="">
    <img v-if="isWeiXin === 'android'" src="../../assets/img/taokey_android.png" alt="">
    <input id="copyTarget" class="copyTarget" type="text" v-model="taoKey" readonly v-if="isSupportCopy" />
    <span id="copySpan" class="copyTarget" v-if="!isSupportCopy">{{taoKey}}</span>

    <button class="copyBtn copy-pos" v-if="isSupportCopy" data-clipboard-target="#copyTarget">一键复制</button>
    <span class="copyText copy-pos" v-if="!isSupportCopy">长按上方框内淘口令进行复制</span>

    <button class="close-btn" @click="hideCover()"></button>
  </div>

</template>
<script>
  import Clipboard from 'Clipboard'

  export default {
    data() {
      return {
        isSupportCopy: true
      }
    },
    computed: {
      isWeiXin() {
        return this.$store.state.isWeiXin
      },
      taoKey() {
        return this.$store.state.taoKey
      }
    },
    mounted() {
      this.isSupportCopy = Clipboard.isSupported()

      var clipboard = new Clipboard('.copyBtn')

      const self = this
      clipboard.on('success', function (e) {
        alert('淘口令复制成功！')
        MtaH5.clickStat("detailtaokey")
        self.hideCover();
      });
      clipboard.on('error', function (e) {
        alert('您的浏览器不支持，请手动复制！')
      });
    },
    methods: {
      hideCover() {
        document.getElementById('cover').style.display = 'none';
      },
      selectTaoKey(e) {
        console.log(e)
        var ctrl = document.getElementById('copySpan');
        var range, selection;
        if (window.getSelection) {
          selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents(ctrl);
          selection.removeAllRanges();
          selection.addRange(range);
        } else if (document.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(ctrl);
          range.select();
        }
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss">
  #cover {
    padding: 0.1rem 0.4rem;
    .copyTarget {
      position: absolute;
      top: 5.3rem;
      width: 4.6rem;
      left: 50%;
      margin-left: -2.3rem;
      border: none;
      text-align: center;
      font-size: 0.32rem;
      background-color: transparent;
      -webkit-user-select: text;
      user-select: text;
    }

    .copyBtn {
      background-image: linear-gradient(90deg, #fe3665, #fc775f);
      border: none;
      color: #fff;
      font-size: 0.3rem;
      border-radius: 5rem;
    }
    .copy-pos {
      position: absolute;
      top: 6.25rem;
      width: 4.5rem;
      height: 0.78rem;
      left: 50%;
      margin-left: -2.25rem;
    }
    .copyText {
      font-size: 0.26rem;
      color: #fe3665;
      top: 6.5rem;      
      text-align: center;
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
