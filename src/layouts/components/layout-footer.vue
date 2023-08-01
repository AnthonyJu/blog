<template>
  <footer class="static bottom-0 z-10 h-60px w-full flex-center">
    <span class="clip">JuPeng's Blog，Made with</span>
    <span mx-6px class="heartbeat">❤️</span>
    <span class="clip">by JuPeng</span>
  </footer>
</template>

<style lang="scss" scoped>
.heartbeat {
  animation: heartbeat 1.5s ease infinite;
}

@keyframes heartbeat {
  0% {
    transform: scale(0.6);
  }

  50% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(0.6);
  }
}
</style>
