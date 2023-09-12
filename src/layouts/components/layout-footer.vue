<template>
  <footer class="w-full flex-center flex-wrap gap-1 pb-10px pt-20px text-14px text-slate">
    <div>
      <span class="clip">JuPeng's Blog，Made with</span>
      <span class="heartbeat mx-7px inline-block">❤️</span>
      <span class="clip">by JuPeng</span>
    </div>
    <div v-show="width >= 650" mx-4px>|</div>
    <div class="flex-center flex-wrap gap-1">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow">
        鲁ICP备2023018296号
      </a>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37020302372175"
        target="_blank"
        rel="nofollow"
        class="flex-center"
      >
        <img src="@/assets/recordcode.png" class="relative bottom-2px mr-1 h-16px w-16px">
        <p>鲁公网安备 37020302372175号</p>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { width } = useWindowSize()
</script>

<style lang="scss" scoped>
.heartbeat {
  animation: heartbeat 1.5s infinite ease;
}

@keyframes heartbeat {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(0.8);
  }
}
</style>
