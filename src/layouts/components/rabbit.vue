<template>
  <img class="rabbit" src="@/assets/rabbit.png" :style="{ right }">
</template>

<script setup lang='ts'>
const { width } = useWindowSize()

const right = computed(() => {
  if (width.value > 1200) {
    return 'calc((100% - 100ch) / 5 - 100px)'
  }
  else {
    return '-82px'
  }
})
</script>

<style lang='scss' scoped>
.rabbit {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 230px;
  pointer-events: none;
  transform-origin: center top;
  animation: rabbit 1.5s infinite alternate;
}

@keyframes rabbit {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(15deg);
  }
}
</style>
