<template>
  <section id="backtop-target" ref="scroll" class="relative full items-center" overflow="x-hidden y-auto">
    <BlogHeader :class="{ filterClass: y > 0 }" />
    <article class="m-auto p-15px" :class="articleWidth" :style="{ minHeight }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </article>
    <BlogFooter />
    <Background />
  </section>
  <el-backtop target="#backtop-target" />
</template>

<script setup lang="ts">
import Background from './components/background.vue'
import BlogHeader from './components/blog-header.vue'
import BlogFooter from './components/blog-footer.vue'

const scroll = ref<HTMLElement>()
const { y } = useScroll(scroll)

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
  articleWidth.value = route.path === '/' ? 'max-w-100ch' : 'max-w-70ch'
}
</script>

<style lang="scss" scoped>
.filterClass {
  background-color: #fffc;
  background-size: 4px 4px;
  backdrop-filter: blur(4px);
}

.dark .filterClass {
  background-color: #000c;
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
