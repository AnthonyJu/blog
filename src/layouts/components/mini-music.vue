<template>
  <div
    v-show="audioState.isPlaying"
    h-40px w-95px flex-center cursor-pointer
    class="fixed top-383px rounded-20px bg-light px-15px duration-400 -right-55px"
    hover="-right-20px"
  >
    <div class="loading">
      <div class="load" />
      <div class="load" />
      <div class="load" />
      <div class="load" />
      <div class="load" />
    </div>
    <div
      class="flex-center flex-1 opacity-60"
      hover="opacity-100"
    >
      <div
        class="text-18px text-black" i-carbon-pause-filled
        title="暂停"
        @click="audioState.audio?.pause()"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.loading {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 24px;
}

.load {
  width: 2px;
  background-color: limegreen;
  border-radius: 5px;
  animation: 1s move6 infinite;
}

.load:nth-child(1) {
  animation-delay: 0.2s;
}

.load:nth-child(2) {
  animation-delay: 0.4s;
}

.load:nth-child(3) {
  animation-delay: 0.6s;
}

.load:nth-child(4) {
  animation-delay: 0.8s;
}

@keyframes move6 {
  0% {
    height: 0.2em;
  }

  25% {
    height: 0.7em;
  }

  50% {
    height: 1.5em;
  }

  100% {
    height: 0.2em;
  }
}
</style>
