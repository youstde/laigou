<template>
  <div class="inner-banner">
    <img  class="lazy" :src="innerBanner" alt="" >
  </div>
</template>

<script>
  export default {
    props: {
      innerBanner: {
        type: String,
        default: ''
      }
    },
    name: 'InnerBanner'
  }
</script>

<style lang="scss">
  .inner-banner {
    img {
      width: 100%
    }
  }
</style>
