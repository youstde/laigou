<template>
	<div class="promotion-title">
    <span class="title" v-text="promotionTitle"></span>
  </div>
</template>

<script>
	export default {
		props: {
			promotionTitle: {
				type: String
			}
		}
	}
</script>

<style lang="scss" scoped>
	.promotion-title {
    position: relative;
		font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background: #fff;
    margin: 0.2rem 0;
    .title {
      background-color: #FFF;
      padding: 0 0.2rem;
      z-index: 2;
      position: relative;
    }
	}
  .promotion-title:before {
    position: absolute;
    content: "/////////////";
    left: 0.3rem;
    color: #444;
    font-size: 0.28rem;
  }
  .promotion-title:after {
    position: absolute;
    content: "/////////////";
    right: 0.3rem;
    color: #444;
    font-size: 0.28rem;
  }
</style>
