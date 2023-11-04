<template>
  <LayoutHeader :class="{ filterClass: y > 0 }" />
  <article
    ref="article"
    class="m-auto px-15px"
    :class="articleWidth"
    :style="{ minHeight: `${minHeight}px` }"
  >
    <Transition name="fade" mode="out-in">
      <div :key="route.path">
        <router-view />
        <LayoutAside v-if="showAside" />
      </div>
    </Transition>
  </article>
  <LayoutFooter ref="footer" />
  <Rabbit />
  <MiniMusic />
  <el-backtop :visibility-height="10">
    <el-progress type="circle" :width="48" :duration="1" :percentage="precent" :stroke-width="4">
      <div class="rocket ml-12px mt-1px -rotate-45" />
    </el-progress>
  </el-backtop>
</template>

<script setup lang="ts">
import LayoutHeader from './components/layout-header.vue'
import LayoutFooter from './components/layout-footer.vue'
import LayoutAside from './components/layout-aside.vue'
import MiniMusic from './components/mini-music.vue'
import Rabbit from './components/rabbit.vue'

// 随机播放音乐
useAudioPlayer()

const { y } = useWindowScroll()
const { height, width } = useWindowSize()

const article = ref()
const footer = ref()
const footerSize = useElementSize(footer)
const minHeight = computed(() => height.value - 70 - footerSize.height.value - 30) // 70: header height，30: footer padding
const precent = computed(() => y.value / (article.value?.offsetHeight - minHeight.value) * 100)

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

.rocket {
  width: 26px;
  height: 26px;
  background: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 48 48' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%23ff6242' d='m14.05 26.58l5.67-7a19.55 19.55 0 0 0-8.5-.24c-3.12.77-3.61 6.66-3.66 9.45a.87.87 0 0 0 1.31.77Z'/%3E%3Cpath fill='%23ff866e' d='M11.24 22a18.17 18.17 0 0 1 6.62-.13l1.86-2.28a19.55 19.55 0 0 0-8.5-.24c-3.12.76-3.61 6.65-3.66 9.44a.85.85 0 0 0 .14.48c.3-2.94 1.09-6.66 3.54-7.27Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='m14.05 26.58l5.67-7a19.55 19.55 0 0 0-8.5-.24c-3.12.77-3.61 6.66-3.66 9.45a.87.87 0 0 0 1.31.77Z'/%3E%3Cpath fill='%23ff6242' d='m20.86 33.4l7-5.67a19.52 19.52 0 0 1 .24 8.49c-.73 3.12-6.58 3.61-9.41 3.66a.87.87 0 0 1-.77-1.31Z'/%3E%3Cpath fill='%23ff866e' d='M25.41 36.21a18 18 0 0 0 .13-6.63l2.28-1.85a19.52 19.52 0 0 1 .24 8.49c-.73 3.12-6.58 3.61-9.41 3.66a.87.87 0 0 1-.48-.14c2.94-.26 6.66-1.09 7.24-3.53Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='m20.86 33.4l7-5.67a19.52 19.52 0 0 1 .24 8.49c-.73 3.12-6.58 3.61-9.41 3.66a.87.87 0 0 1-.77-1.31Z'/%3E%3Cpath fill='%23e8f4fa' d='M39.48 21.56c5.42-5.7 3.71-12.73 2.86-15.2a2 2 0 0 0-.48-.78a2.13 2.13 0 0 0-.77-.48c-2.47-.85-9.51-2.56-15.21 2.9C18.84 14.66 14 26.5 14 26.5l7 7s11.78-4.9 18.48-11.94Z'/%3E%3Cpath fill='%23fff' d='M28.05 11.87c5.53-5.27 12.31-3.8 15-2.94a17.29 17.29 0 0 0-.66-2.57a2 2 0 0 0-1.3-1.26c-2.47-.85-9.51-2.56-15.21 2.9C18.84 14.66 14 26.5 14 26.5l2.69 2.69c1.43-3.19 5.68-11.92 11.36-17.32Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M39.48 21.56c5.42-5.7 3.71-12.73 2.86-15.2a2 2 0 0 0-.48-.78a2.13 2.13 0 0 0-.77-.48c-2.47-.85-9.51-2.56-15.21 2.9C18.84 14.66 14 26.5 14 26.5l7 7s11.78-4.9 18.48-11.94Z'/%3E%3Cpath fill='%2345413c' d='M18.22 44.21a10 1.5 0 1 0 20 0a10 1.5 0 1 0-20 0Z' opacity='.15'/%3E%3Cpath fill='%23ff6242' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M22.7 25.65a.68.68 0 0 0-.92-.93a22.13 22.13 0 0 0-5.31 3.8a17.84 17.84 0 0 0-3.87 5.86a.34.34 0 0 0 .44.45A17.84 17.84 0 0 0 18.9 31a21.91 21.91 0 0 0 3.8-5.35Z'/%3E%3Cpath fill='%23c0dceb' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M28.24 13.72a5.49 5.49 0 1 0 10.98 0a5.49 5.49 0 1 0-10.98 0Z'/%3E%3Cpath fill='%2300b8f0' d='M29.96 13.69a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0-7.6 0Z'/%3E%3Cpath fill='%234acfff' d='M31.07 11a3.8 3.8 0 0 0 0 5.38a3.94 3.94 0 0 0 .85.62l3.55-6.69a3.77 3.77 0 0 0-4.4.69Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M29.96 13.69a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0-7.6 0Z'/%3E%3Cpath fill='%23ff8a14' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M11.34 41.47c-.7.7-5.16 2.21-7.42 2.94c-.42.14-1-.47-.89-.89c.73-2.25 2.24-6.71 3-7.42c.95-1 3.43-1 4.91.46s1.35 3.96.4 4.91Z'/%3E%3Cpath fill='%23ffe500' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M10.13 39.79c-.5.49-2.57 1-3 .56s.07-2.54.57-3a1.57 1.57 0 0 1 2.13.34a1.56 1.56 0 0 1 .3 2.1Z'/%3E%3Cpath fill='%23ffe500' d='m43.32 23.69l.8 1.51a.42.42 0 0 0 .32.22l1.69.2a.42.42 0 0 1 .25.71l-1.19 1.22a.39.39 0 0 0-.11.37l.33 1.67a.42.42 0 0 1-.59.46l-1.53-.76a.44.44 0 0 0-.39 0l-1.49.84a.43.43 0 0 1-.62-.43L41 28a.41.41 0 0 0-.13-.36l-1.21-1.14a.42.42 0 0 1 .21-.72l1.68-.29a.41.41 0 0 0 .31-.23l.72-1.55a.41.41 0 0 1 .74-.02Z'/%3E%3Cpath fill='%23fff48c' d='m40.53 27.31l1.06-.19a.4.4 0 0 0 .31-.23l.72-1.55a.42.42 0 0 1 .75 0l.79 1.51a.42.42 0 0 0 .32.22l1.07.13l.83-.85a.42.42 0 0 0-.25-.71l-1.69-.2a.42.42 0 0 1-.32-.22l-.8-1.51a.41.41 0 0 0-.74 0l-.72 1.55a.41.41 0 0 1-.31.23l-1.68.29a.42.42 0 0 0-.21.72Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='m43.32 23.69l.8 1.51a.42.42 0 0 0 .32.22l1.69.2a.42.42 0 0 1 .25.71l-1.19 1.22a.39.39 0 0 0-.11.37l.33 1.67a.42.42 0 0 1-.59.46l-1.53-.76a.44.44 0 0 0-.39 0l-1.49.84a.43.43 0 0 1-.62-.43L41 28a.41.41 0 0 0-.13-.36l-1.21-1.14a.42.42 0 0 1 .21-.72l1.68-.29a.41.41 0 0 0 .31-.23l.72-1.55a.41.41 0 0 1 .74-.02Z'/%3E%3Cpath fill='%23ffe500' d='m31.74 40.59l.26 1.35a.35.35 0 0 0 .2.24l1.27.54a.34.34 0 0 1 0 .6l-1.2.68a.32.32 0 0 0-.17.26l-.1 1.37a.34.34 0 0 1-.57.22l-1-.93a.3.3 0 0 0-.3-.08l-1.34.3a.34.34 0 0 1-.38-.47l.59-1.25a.31.31 0 0 0 0-.31l-.7-1.18a.34.34 0 0 1 .33-.51l1.36.16a.38.38 0 0 0 .3-.11l.9-1a.34.34 0 0 1 .55.12Z'/%3E%3Cpath fill='%23fff48c' d='m28.76 42.75l.86.1a.35.35 0 0 0 .3-.11l.9-1a.34.34 0 0 1 .59.15l.27 1.35a.31.31 0 0 0 .19.24l.8.34l.84-.47a.34.34 0 0 0 0-.6l-1.27-.54a.35.35 0 0 1-.2-.24l-.27-1.35a.34.34 0 0 0-.58-.16l-.9 1a.38.38 0 0 1-.3.11l-1.36-.16a.34.34 0 0 0-.33.51Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='m31.74 40.59l.26 1.35a.35.35 0 0 0 .2.24l1.27.54a.34.34 0 0 1 0 .6l-1.2.68a.32.32 0 0 0-.17.26l-.1 1.37a.34.34 0 0 1-.57.22l-1-.93a.3.3 0 0 0-.3-.08l-1.34.3a.34.34 0 0 1-.38-.47l.59-1.25a.31.31 0 0 0 0-.31l-.7-1.18a.34.34 0 0 1 .33-.51l1.36.16a.38.38 0 0 0 .3-.11l.9-1a.34.34 0 0 1 .55.12Z'/%3E%3Cpath fill='%239ceb60' d='M11.86 7a3.06 3.06 0 1 1-2.59-3.44A3.06 3.06 0 0 1 11.86 7Z'/%3E%3Cpath fill='%23c8ffa1' d='M9.27 5.74a3.06 3.06 0 0 1 2.41 2a2.87 2.87 0 0 0 .18-.74a3.06 3.06 0 0 0-6.06-.85A3.23 3.23 0 0 0 6 7.67a3.08 3.08 0 0 1 3.27-1.93Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M11.86 7a3.06 3.06 0 1 1-2.59-3.44A3.06 3.06 0 0 1 11.86 7Z'/%3E%3Cpath fill='none' stroke='%2345413c' stroke-linecap='round' stroke-linejoin='round' d='M5.86 7.3C5.1 7.82 3.57 9 4 9.86s10.49-5.15 10.14-6s-2.5.12-3.26.48'/%3E%3C/svg%3E");
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
