<template>
  <div class="coupon-card">
    <span>{{ coupon || 9 }}</span>
  </div>
</template>
<script>
  export default {
    props: ['coupon'],
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  $pink: #ff4d73;
  .coupon-card {
    display: inline-block;
    background-image: url('../../../../assets/img/coupon_1.png');
    background-size: 100% 100%;
    position: relative;
    span{
      color: #fff;
      position: absolute;
      font-size: 0.36rem;
      right: 0.1rem;
      top: 0.1rem;
      font-weight: 700;
      width: 0.7rem;
      text-align: center;
    }
  }
</style>
