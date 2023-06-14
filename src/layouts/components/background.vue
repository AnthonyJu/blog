<template>
  <div class="layout-colorBackground fixed top-10 opacity-40 dark:opacity-50" />
  <div class="layout-colorBackgroundBottom fixed bottom-0 opacity-20 dark:opacity-10" />
</template>

<style lang='scss' scoped>
.layout-colorBackground {
  top: 50px;
  left: 50%;
  z-index: -1;
  width: 100%;
  height: 80vh;
  background: radial-gradient(at 71% 77%,#7d7aff 0,transparent 21%), radial-gradient(at 36% 47%,#00fff0 0,transparent 50%), radial-gradient(at 54% 29%,#00fff0 0,transparent 28%), radial-gradient(at 45% 51%,#7d7aff 0,transparent 53%), radial-gradient(at 73% 44%,#2121e2 0,transparent 54%), radial-gradient(at 24% 7%,#2121e2 0,transparent 40%), radial-gradient(at 76% 46%,#7d7aff 0,transparent 50%);
  filter: blur(44px);
  transform: translateX(-50%) rotate(-4deg);
}

.layout-colorBackgroundBottom {
  bottom: -100px;
  left: 50%;
  z-index: -1;
  width: 100%;
  height: 600px;
  background: radial-gradient(at 83% 25%,#7d7aff 0,transparent 30%), radial-gradient(at 36% 47%,#00fff0 0,transparent 50%), radial-gradient(at 79% 45%,#00fff0 0,transparent 28%), radial-gradient(at 66% 38%,#7d7aff 0,transparent 53%), radial-gradient(at 89% 13%,#2121e2 0,transparent 54%), radial-gradient(at 24% 7%,#2121e2 0,transparent 40%), radial-gradient(at 76% 46%,#7d7aff 0,transparent 50%);
  filter: blur(44px);
  transform: translateX(-50%) rotate(180deg);
}
</style>
