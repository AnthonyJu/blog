<template>
  <div>系统将在 {{ time }}s 后自动刷新页面以更新！</div>
</template>

<script setup lang='ts'>
const time = ref(5)

onMounted(() => {
  setInterval(() => {
    time.value--
    // if (time.value === 0) {
    //   location.reload()
    // }
  }, 1000)
})
</script>

<style lang='scss' scoped>

</style>
