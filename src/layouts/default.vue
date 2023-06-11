<template>
  <LayoutHeader :class="{ filterClass: y > 0 }" />
  <article class="m-auto p-15px" :class="articleWidth" :style="{ minHeight }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <el-backtop target="#app" />
  </article>
  <LayoutFooter />
  <Background />
</template>

<script setup lang="ts">
import Background from './components/background.vue'
import LayoutHeader from './components/layout-header.vue'
import LayoutFooter from './components/layout-footer.vue'

const { y } = useWindowScroll()

const { height } = useWindowSize()
const minHeight = computed(() => `${height.value - 60 - 60}px`)

const route = useRoute()
const articleWidth = ref('')

// 根据路由设置显示宽度
watch(() => route.path, () => {
  if (articleWidth.value === '') setArticleWidth()
  else setTimeout(setArticleWidth, 500)
}, { immediate: true })

function setArticleWidth() {
  articleWidth.value = route.path === '/' ? 'max-w-110ch' : 'max-w-70ch'
}
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
