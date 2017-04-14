<template>
	<div>
		<channelTpl v-if="type === 'channel'"></channelTpl>
		<categoryTpl v-if="type === 'category'"></categoryTpl>
		<topicTpl v-if="type === 'topic'"></topicTpl>
	</div>
</template>

<script>
	import channelTpl from '@/views/channel/index'
	import categoryTpl from '@/views/category/index'
	import topicTpl from '@/views/topic/index'
	import { mapGetters } from 'vuex'

	export default {
		data () {
			return {
				type: ''
			}
		},
		created () {
			this.initView();
		},
		watch: {
			'$route' () {
				this.initView();
			}
		},
    mounted () {
			this.doLog();
    },
		methods: {
			doLog () {
        MtaH5.clickStat('daohang',{'enter':'true'})
        MtaH5.clickStat('yaofeng',{'entry':'true'})
        MtaH5.clickStat('danchuang',{'entry':'true'})
        MtaH5.clickStat('lunbo',{'enter':'true'})
      },
			initView () {
				const currentTab = this.$route.params.key;
				this.type = currentTab.split('_')[0];
				if (this.type === 'topic') {
					this.$store.commit('setNavStatus', false)
				} else {
          this.$store.commit('setNavStatus', true)
        }
				this.$store.commit('setCurrentTab', currentTab);
			}
		},
		components: {
			channelTpl,
			categoryTpl,
			topicTpl
		}
	}
</script>
