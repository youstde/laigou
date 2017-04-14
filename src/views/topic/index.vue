<template>
  <div>
    <Normal v-if="topicType === 'normal'"></Normal>
    <Coupon v-if="topicType === 'coupon'"></Coupon>
    <LowPrice v-if="topicType === 'lowPrice'"></LowPrice>
  </div>
</template>

<script>
  import Normal from './tpl/normal'
  import Coupon from './tpl/coupon'
  import LowPrice from './tpl/lowPrice'
  import Utils from '@/assets/js/utils'

  export default {
  	components: {
  		Normal,
      Coupon,
      LowPrice
    },
    data () {
    	return {
        topicType: ''
      }
    },
    watch: {
      '$route' () {
        this.initView();
      }
    },
    mounted () {
      this.initView();
    },
    methods: {
      initView () {
        const route = this.$route.params.key.split('_')[1];
        console.log(route);
        this.topicType = Utils.getQueryString(route, 'tpl');
      }
    }
  }
</script>
