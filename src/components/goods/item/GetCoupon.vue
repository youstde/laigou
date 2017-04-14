<template>
  <span class="getCoupon"><span>¥</span><span class="price">{{ coupon||20 }}</span>优惠券<svg class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M322.392 90.125l421.803 421.898-421.803 421.852v-843.75z" p-id="2040"></path></svg></span>
</template>
<script>
  export default {
    props: ['coupon']
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  $pink: #ff4d73;
  .getCoupon {
    font-size: 0.24rem;
    color: #ffffff;
    padding: 0.12rem 0.18rem 0.16rem;
    margin: 0;
    background-image: url('./coupon.png');
    background-size: 100% 100%;
    position: absolute;
    top: 2.04rem;
    right: 0rem;
    font-weight: 700;
    span {
      position: relative;
      color: #f3fb21;
      top: 0.02rem;
      &.price {
        font-size: 0.34rem;
      }
    }
    svg{
      width: 0.3rem;
      position: relative;
      top: 0.06rem;
      fill: #fff;
    }
    /*&::after {*/
    /*content: "";*/
    /*position: absolute;*/
    /*left: -0.06rem;*/
    /*bottom: 0.015rem;*/
    /*display: inline-block;*/
    /*width: 0;*/
    /*height: 0;*/
    /*border-bottom: 0.12rem solid $pink;*/
    /*border-left: 0.12rem solid transparent;*/
    /*}*/
  }

</style>
