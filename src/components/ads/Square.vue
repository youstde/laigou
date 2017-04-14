<template lang="html">
  <div class="toufumodule">
    <div class="toufumoduleLeft">
      <a href="javascript:void(0)" @click="skip(square[0].skipUrl, square[0].id, square[0].title)">
        <img :src="square[0].picUrl" alt="">
      </a>
    </div>
    <div class="toufumoduleRight">
        <div class="toufumoduleRight-top">
          <a href="javascript:void(0)" @click="skip(square[1].skipUrl, square[1].id, square[1].title)">
            <img :src="square[1].picUrl" alt="">
          </a>
        </div>
        <div class="toufumoduleRight-bottom">
          <a href="javascript:void(0)" @click="skip(square[2].skipUrl, square[2].id, square[2].title)">
            <img :src="square[2].picUrl" alt="">
          </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    square: {
      type: Array,
      default: []
    },
    appKey: appKey,
    adTag: adTag
  },
  methods: {
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
      // this.doLog(url, id, title);
    }
  }
}
</script>

<style lang="scss">
.toufumodule {
  width: 100%;
  height: 3.3rem;
  margin-top: 0.2rem;
  display: flex;
  display: -webkit-flex; /* Safari */
  .toufumoduleLeft {
    flex:1;
    height:100%;
    border-right: 0.5px solid #d3d3d3;
    position: relative;
    // background-color: pink;
    a {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .toufumoduleRight {
    flex: 1;
    height:100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: column;
    .toufumoduleRight-top {
      flex:1;
      width: 100%;
      border-bottom: 0.5px solid #d3d3d3;
      position: relative;
      // background-color:#ccc;
      a {
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .toufumoduleRight-bottom {
      flex: 1;
      width: 100%;
      position: relative;
      // background-color:#666;
      a {
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
