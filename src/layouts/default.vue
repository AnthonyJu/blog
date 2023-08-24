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
  <el-backtop />
  <LayoutFooter />
  <Background />
</template>

<script setup lang="ts">
import Background from './components/background.vue'
import LayoutHeader from './components/layout-header.vue'
import LayoutFooter from './components/layout-footer.vue'
import LayoutAside from './components/layout-aside.vue'

const { y } = useWindowScroll()

const { height, width } = useWindowSize()
// 70: header height
// 60: footer height
const minHeight = computed(() => `${height.value - 70 - 60}px`)

const route = useRoute()
const articleWidth = ref('max-w-100ch')

// 根据路由设置显示宽度
watch(() => route.path, () => {
  if (articleWidth.value === '') setArticleWidth()
  else setTimeout(setArticleWidth, 500)
}, { immediate: true })

function setArticleWidth() {
  articleWidth.value = route.path === '/' ? 'max-w-100ch' : 'max-w-70ch'
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
