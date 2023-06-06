<template>
  <section ref="scroll" class="relative full items-center" overflow="x-hidden y-auto">
    <BlogHeader :class="{ filterClass: y > 0 }" :width="width" />
    <article class="m-auto max-w-70ch w-[calc(100%-30px)] p-15px" :style="{ minHeight }">
      <Back />
      <RouterView />
    </article>
    <BlogFooter />
    <Background />
  </section>
</template>

<script setup lang="ts">
import Back from './components/back.vue'
import BlogHeader from './components/blog-header.vue'
import BlogFooter from './components/blog-footer.vue'

const scroll = ref<HTMLElement>()
const { y } = useScroll(scroll)

const { width, height } = useWindowSize()
const minHeight = computed(() => {
  return `${height.value - 60 - 60 - 30}px`
})
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
