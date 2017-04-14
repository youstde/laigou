<template>
  <div class="product-click">
    <a @click="toWhere(id, url)"></a>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    components: {

    },
    props: {
      appKey: appKey,
      adTag: adTag,
      id: {
        type: Number,
        default: 0
      },
      guessLike: false
    },
    data() {
      return {
        url: ''
      }
    },
    computed: {
      isWeiXin() {
        return this.$store.state.isWeiXin
      },
      ...mapGetters(['appKey', 'adTag']),

    },
    methods: {
      toWhere(id, url) {
        // console.log(this.$route.path)
        // window.localStorage.setItem('productClick', this.$route.path)
        MtaH5.clickStat('Goods', {
          'goodsname': id.toString()
        })
        MtaH5.clickStat('daohang', {
          'goods': 'true'
        })
        MtaH5.clickStat('yaofeng', {
          'goods': 'true'
        })
        MtaH5.clickStat('danchuang', {
          'goods': 'true'
        })
        MtaH5.clickStat('lunbo', {
          'goods': 'true'
        })
        mlinkTrack.sendEvent({
          a: 'c',
          cid: id
        });
        if (this.guessLike) {
          MtaH5.clickStat('detaillike', {
            'id': id.toString()
          })
        }
        if (this.isWeiXin) {
          window.open(`/lg/detail/${id}?appKey=${this.appKey}&ADTAG=${this.adTag}`)
        } else {
          this.$router.push({
            name: 'itemDetail',
            params: {
              itemId: id
            },
            query: {
              appKey: this.appKey,
              ADTAG: this.adTag
            }
          })
        }
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss">
  .product-click a {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 90;
  }

</style>
