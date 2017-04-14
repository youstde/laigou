<template>
  <div class="back-top" @click="toTop()" v-if='scrolled'>
    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path d="M145.664 306.368h732.288c16.768 0 30.464-11.2 30.464-24.96 0-13.696-13.696-24.896-30.464-24.896H145.664c-16.768 0-30.528 11.2-30.528 24.96 0 13.696 13.76 24.896 30.528 24.896zM950.4 703.936l-417.024-340.48a35.648 35.648 0 0 0-43.136 0L73.088 703.936a21.888 21.888 0 0 0 0 35.2 35.648 35.648 0 0 0 43.136 0l395.52-322.88 395.52 322.88a35.648 35.648 0 0 0 43.136 0 21.888 21.888 0 0 0 0-35.2z"
            p-id="2560"></path>
    </svg>
  </div>
</template>
<script>
  import Elevator from 'elevator.js'

  export default {
    data () {
      return {
        scrolled: 0
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      var elevator = new Elevator({
        element: document.querySelector('.back-top'),
        duration: 500 // milliseconds
      });
    },
    methods: {
      toTop: function () {
        document.body.scrollTop = 0
      },
      handleScroll () {
        this.scrolled = window.scrollY > 0;
      }
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  $colorf: #fff;
  $colore6: #e6e6e6;
  .back-top {
    width: 0.88rem;
    height: 0.88rem;
    position: fixed;
    right: 0.3rem;
    bottom: 0.4rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(254,41,71,.5);
    z-index: 1000;

    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: rgba(254,41,71,.5);
    z-index: 1000;
    svg {
      fill: $colorf;
      width: 0.46rem;
      height: 0.46rem;
    }
  }

</style>
