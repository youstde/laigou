<template>
  <span class="malltext">
		<span v-if="mall==='TB'">淘宝</span>
  <span v-else-if="mall==='TM'">天猫</span>
  </span>
</template>
<script>
  export default {
    props: ['mall']
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  $pink: #f84d65;
  $bg: #fbc6cd;
  .malltext {
    color: $pink;
    border-radius: 0.02rem;
    font-size: 0.24rem;
    padding: 0rem 0.02rem;
    background-color: $bg;
    position: relative;
    top: -0.02rem;
  }

</style>
