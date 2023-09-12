<template>
  <LayoutHeader :class="{ filterClass: y > 0 }" />
  <article class="m-auto px-15px" :class="articleWidth" :style="{ minHeight }">
    <transition name="fade" mode="out-in">
      <div :key="route.path">
        <router-view />
        <LayoutAside v-if="showAside" />
      </div>
    </transition>
  </article>
  <LayoutFooter ref="footer" />
  <Rabbit />
  <MiniMusic />
  <el-backtop />
  <Background />
</template>

<script setup lang="ts">
import Background from './components/background.vue'
import LayoutHeader from './components/layout-header.vue'
import LayoutFooter from './components/layout-footer.vue'
import LayoutAside from './components/layout-aside.vue'
import MiniMusic from './components/mini-music.vue'
import Rabbit from './components/rabbit.vue'

// 随机播放音乐
useAudioPlayer()

const { y } = useWindowScroll()
const { height, width } = useWindowSize()

const footer = ref()
const elSize = useElementSize(footer)
const minHeight = computed(() => `${height.value - 70 - elSize.height.value ?? 60}px`) // 70: header height

const route = useRoute()
const articleWidth = ref('max-w-100ch')

// 根据路由设置显示宽度
watch(() => route.path, (to, from) => {
  // 从其他页面跳转到首页
  if (to === '/' && from) {
    setTimeout(setArticleWidth, 500)
  }
  // 从首页跳转到其他页面
  else if (from === '/') {
    setTimeout(setArticleWidth, 500)
  }
  else if (to !== '/' && !from) {
    articleWidth.value = 'max-w-75ch'
  }
}, { immediate: true })

function setArticleWidth() {
  articleWidth.value = route.path === '/' ? 'max-w-100ch' : 'max-w-75ch'
}

const showAside = computed(() => {
  const isBlogOrNote = route.path.startsWith('/blog/') || route.path.startsWith('/note/')
  return isBlogOrNote && width.value >= 1280
})
</script>

<style lang="scss" scoped>
.filterClass {
  background-color: #fffc;
  background-size: 4px 4px;
  backdrop-filter: blur(4px);
}

.dark .filterClass {
  background-color: #0e0c1acc;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
