<template>
  <div class="show-cover" @click="showCover()"></div>
</template>
<script>
  export default {
    methods: {
      showCover(){
        document.getElementById('cover').style.display = 'block';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .show-cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
</style>
