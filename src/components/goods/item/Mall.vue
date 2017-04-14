<template>
<span id ='mallBox'>
    <!-- <svg v-if="mall==='TB'" class="mall tao" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M402.9 498.6l80.5 0 0-58.2-23.2 0C430.9 468.7 404.2 497.2 402.9 498.6z" p-id="2023"></path>
        <path d="M402.9 498.6l-0.1 0L402.9 498.6C402.8 498.6 402.9 498.6 402.9 498.6z" p-id="2024"></path>
        <path d="M483.4 654.2l0 4.3c0 0 2.1-4 0.4-4.3C483.7 654.2 483.5 654.2 483.4 654.2z" p-id="2025"></path>
        <path d="M744.7 685.9l-0.1 0.5 1-0.4C745.2 686 744.9 685.9 744.7 685.9z" p-id="2026"></path>
        <path d="M834.5 56.8 189.5 56.8c-83.8 0-151.7 67.9-151.7 151.7l0 607c0 83.8 67.9 151.7 151.7 151.7l644.9 0c83.8 0 151.7-67.9 151.7-151.7l0-607C986.2 124.7 918.3 56.8 834.5 56.8zM245.2 219c37.7 0 68.2 27.5 68.2 61.2 0 33.6-30.5 61.1-68.2 61.1s-68.2-27.5-68.2-61.1C177.1 246.5 207.6 219 245.2 219zM302.1 586.3c-18 55.8-13.5 35.1-84.9 190.3l-103.5-64.5c0 0 115.4-105.1 139.1-153 25-50.6-27.7-77.6-27.7-77.6L145.9 432l42.8-66c59.8 44.4 64.3 48.1 104.6 88.5C324.5 485.8 320.6 529.3 302.1 586.3zM864.6 658.6c-20.2 189.4-266.4 119-266.4 119l13.3-54.2 47.7 12.2c60 3.9 79.6-24.3 85.3-49.3l-62.7 25.7-13.3-49.9c-33.7 25.9-103.9 63.2-226.1 59.9-130.8 3.3-97.2-155.5-97.2-155.5l3.4-9.8 91.9 0c-0.6 29.1-8.6 59 2.3 76.2 8.8 14 26.1 20.5 40.6 21.2L483.4 527.6 337.9 527.6l0-29.1 64.8 0-40.2-35.1c28.6-30.1 57.2-77.6 74.8-109.5-14.4 5.8-29.2 12.1-44.3 18.8-15 18.8-32 38.2-51 57.2 0.7 1-65.7-37.3-65.7-37.3 68.6-58.7 107.1-184.3 107.1-184.3l95.6 26.7c0 0-8 18.6-24.2 47 382.5-108.2 404.7 66.4 404.7 66.4S884.8 469.4 864.6 658.6z"
          p-id="2027"></path>
        <path d="M485.6 332l45 5.1c-3.5 11.9-12 45.1-28.7 45.1l214.2 0 0 58.2L599.8 440.4l0 58.2 116.4 0 0 29.1L599.8 527.7l0 116.9c0-6.6 39.3-15.3 55.1-27l-10.7-42.9 61.8-19.1 37.4 89.2c0.6-0.1 1.2-0.2 1.9-0.3L745.3 382.2C745.3 280.5 658.8 270 485.6 332z"
          p-id="2028"></path>
      </svg> -->
      <svg v-if="mall==='TB'" class="mall tao" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      	 viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
      <image style="overflow:visible;" width="37" height="37" id="XMLID_2_" xlink:href="data:image/png;base64,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" transform="matrix(1 0 0 1 1.8982 1.8422)">
      </image>
      </svg>
      <!-- <svg v-else-if="mall==='TM'" class="mall mao" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M890.295 97.65h-756.588c-19.581 0-36.052 16.475-36.052 36.052v756.151c0 20.027 16.471 36.494 36.052 36.494h756.588c19.586 0 36.047-16.468 36.047-36.494v-756.151c0-19.575-16.463-36.052-36.047-36.052zM815.086 326.848h-239.001v487.34h-122.385v-487.34h-244.78v-117.039h606.163v117.039z"
            p-id="1033"></path>
    </svg> -->
    <svg v-else-if="mall==='TM'" class="mall mao" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 viewBox="0 0 40 40" style="enable-background:new 0 0 40 40;" xml:space="preserve">
    <image style="overflow:visible;" width="34" height="34" id="XMLID_2_" xlink:href="data:image/png;base64,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" transform="matrix(1 0 0 1 3 3)">
    </image>
    </svg>
</span>
</template>
<script>
export default {
  props: ['mall']
}
</script>
<style lang="scss">
span#mallBox {
    position: relative;
    top: 0.04rem;
}
.mall {
    width: 0.45rem;
    margin-right: 0.02rem;
    top: 0.02rem;
    position: relative;
}
.tao {
    fill: rgb(255, 137, 47);
}
.mao {
    fill: #d81e06;
}
</style>
