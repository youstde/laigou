<template>
  <span class="price">
    ¥<span class="price-color">{{price.split('.')[0]}}</span><span class="price-color jiao" v-if="price.split('.')[1]">.{{price.split('.')[1]}}</span>
    <span class="price-gray">¥{{ originPrice }}</span>
  </span>
</template>
<script>
  export default {
    props: ['price', 'originPrice'],
    created(){
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  $price: #fe2947;

  .price {
    margin: 0.3rem 0 0;
    color: $price;
    .price-color {
      font-size: 0.56rem;
      &.jiao {
        font-size: 0.4rem;
      }
    }
    .price-gray {
      font-size: 0.28rem;
      color: #999;
      text-decoration: line-through;
    }

  }
</style>
