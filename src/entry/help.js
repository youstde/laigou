import Vue from 'vue'
import helpJson from 'static/service/help.json'
import '@/assets/js/rem'
import '@/assets/css/help'

new Vue({
	el: '#app',
	data () {
		return {
			faq: helpJson.faq,
			fixed: helpJson.fixed
		}
	},
	methods: {
		slide (item) {
			if (item.isShow) {
				item.isShow = false;
			} else {
				item.isShow = true;
			}
		}
	}
})
