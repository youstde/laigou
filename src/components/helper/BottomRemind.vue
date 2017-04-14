<template>
<div class="bottom-remind" v-if="isShow">
  {{ text }}
</div>
</template>

<script>

export default {
  props: [
    'isShow',
    'text'

  ]
}
</script>
<style lang="scss">
.bottom-remind{
  padding: 0.4rem;
  text-align: center;
  background-color: #fff;
  font-size: 0.24rem;
  color: #999;
}
</style>
