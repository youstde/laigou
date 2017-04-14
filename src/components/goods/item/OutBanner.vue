<template>
	<div class="out-banner">
	<a :href="'#home/topic_tpl=normal&topicId=' + outBanner.id" @click="doLog(outBanner.id, outBanner.name)">
		<img :src="outBanner.outBanerUrl" alt="">
	</a>
	</div>
</template>

<script>
	export default {
		props: {
			outBanner: {
				type: Object,
				default: {}
			}
		},
    methods: {
      doLog(id, name) {
        MtaH5.clickStat('Carousel',{'carouselname': id.toString() })
      }
    }
	}
</script>

<style lang="scss" scoped>
	.out-banner {
		height: 2.4rem;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
