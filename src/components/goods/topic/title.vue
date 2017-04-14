<template>
  <div class="count-down-title">
    <span class="has-caption" v-text="countTime > 0 ? '距离' + topicTitle + '结束还剩' : topicTitle "></span>
  </div>
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
    padding: .2rem 0 ;
    font-size: .26rem;
  }
  .has-caption {
    font-size: 0.26rem;
    color: #fff;
    opacity: 0.8;
    display: inline-block;
    position: relative;
    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0.14rem;
      width: 0.8rem;
      height: 1px;
      background-color: #fff;
      opacity: 0.6;
    }
    &::before {
      right: 100%;
      margin-right: 0.1rem;
    }
    &::after {
      left: 100%;
      margin-left: 0.1rem;
    }
  }
</style>
