<template>
  <p class="count-down-title">
    <span class="has-caption" v-text="countTime > 0 ? '距离' + topicTitle + '结束还剩' : topicTitle "></span>
  </p>
</template>

<script>
  export default {
  	props: {
      topicTitle: {
      	type: String,
        default: ''
      },
      countTime: {
      	type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .count-down-title {
    margin-top: .16rem;
    margin-bottom: .2rem;
    font-size: .26rem;
  }
  .has-caption {
    display: inline-block;
    position: relative;
    &::before, &::after {
                  content: "";
                  display: inline-block;
                  position: absolute;
                  top: 0.14rem;
                  width: 0.7rem;
                  height: 1px;
                  background-color: #eee;
                }
    &::before {
       right: 100%;
       margin-right: 0.36rem;
     }
    &::after {
       left: 100%;
       margin-left: 0.36rem;
     }
  }
</style>
