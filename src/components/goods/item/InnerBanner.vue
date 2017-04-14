<template>
	<div class="inner-banner">
		<img :src="innerBanner" alt="">
	</div>
</template>

<script>
export default {
  props: {
		innerBanner: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
	.inner-banner {
		height: 2.4rem;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>