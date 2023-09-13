<template>
  <img class="rabbit" src="https://www.macgf.com/img/tu02.png" :style="{ right }" @error="handleError">
</template>

<script setup lang='ts'>
import Rabbit from '@/assets/rabbit.png'

const { width } = useWindowSize()

const right = computed(() => {
  if (width.value > 1200) {
    return 'calc((100% - 100ch) / 5 - 100px)'
  }
  else {
    return '-82px'
  }
})

function handleError(e: Event) {
  (e.target as HTMLImageElement).src = Rabbit
}
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
