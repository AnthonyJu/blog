<template>
  <main ref="scroll" class="relative full items-center" overflow="x-hidden y-auto">
    <Header :class="{ header: y > 0 }" :width="width" />
    <article class="m-auto max-w-70ch w-[calc(100%-30px)] p-15px" :style="{ minHeight }">
      <router-view />
    </article>
    <Footer />
    <Background />
  </main>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Background from './components/background.vue'

const scroll = ref<HTMLElement>()
const { y } = useScroll(scroll)

const { width, height } = useWindowSize()
const minHeight = computed(() => {
  return `${height.value - 60 - 60 - 30}px`
})
</script>
