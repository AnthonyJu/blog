<template>
  <div mt-10px h-50px flex-center>
    <div id="he-plugin-simple" />
  </div>
</template>

<script setup lang='ts'>
useScriptTag('https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0')

onMounted(() => {
  window.WIDGET = {
    CONFIG: {
      modules: '01234',
      background: '5',
      tmpColor: '2FC9FC',
      tmpSize: '16',
      cityColor: '2FC9FC',
      citySize: '16',
      aqiColor: '2FC9FC',
      aqiSize: '16',
      weatherIconSize: '24',
      alertIconSize: '18',
      // padding: '10px 10px 10px 10px',
      shadow: '0',
      language: 'auto',
      fixed: 'false',
      vertical: 'top',
      horizontal: 'left',
      key: '17ebff6847284776a60b12280a5e36c3',
    },
  }
})
</script>

<style lang='scss' scoped>
::v-deep(#he-plugin-simple) {
  pointer-events: none;

  .module {
    color: #409eff !important;
  }

  .s-sticker-cond {
    position: relative;
    top: -1px;
    left: 4px;
    padding: 0;

    img {
      max-width: 24px;
    }
  }
}
</style>
