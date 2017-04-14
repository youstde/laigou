<template>
  <div class="bottom-count">
    <span>6</span>
    <i class="line"></i>
    <span>187</span>
  </div>
</template>

<script>
  export default {
    methods: {
      toTop: function () {
        console.log('need to top')
      }
    }
  }

</script>
<style lang="scss">
  $color6:#666;
  $colore6:#e6e6e6;
  .bottom-count {
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    right: 0.3rem;
    bottom: 0.4rem;
    border: 1px solid $colore6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.22rem;
    color: $color6;
    background-color: rgba(255, 255, 255, 0.6);
    i {
      width: 0.54rem;
      height: 1px;
      background-color: $color6;
    }
  }

</style>
