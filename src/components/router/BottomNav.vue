<template>
  <div class="back-prev" @click="setHistory(-1)">
    <svg style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M687.732364 172.450909 313.460364 511.488l374.295273 339.013818c13.079273 12.939636 13.079273 33.885091 0 46.801455-13.079273 12.939636-34.257455 12.939636-47.336727 0L242.106182 536.552727c-6.958545-6.888727-9.937455-16.034909-9.472-25.064727-0.465455-9.029818 2.513455-18.152727 9.472-25.064727L640.418909 125.649455c13.079273-12.916364 34.257455-12.916364 47.336727 0C700.811636 138.589091 700.811636 159.534545 687.732364 172.450909z"></path>
    </svg>
  </div>
</template>
<script>
  export default {
    methods: {
      setHistory(step) {
        console.log(history.length)
        if (history.length === 1) {
          this.$router.push({
            name: 'home'
          })
          location.reload()
          return;
        }
        this.$router.go(step)

      },
      refresh() {
        location.reload();
      }
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  $colorf: #fff;
  $colore6: #e6e6e6;
  .back-prev {
    width: .88rem;
    height: .88rem;
    position: fixed;
    left: .3rem;
    bottom: .4rem;
    border-radius: 50%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: rgba(254, 41, 71, .5);
    z-index: 1000;
    svg {
      fill: $colorf;
      width: 0.4rem;
      height: 0.4rem;
    }
  }

</style>
