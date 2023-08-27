<template>
  <aside class="aside-content fixed top-100px">
    <el-scrollbar height="500px">
      <AsideContents :contents="contents" :hightlight-id="hightlightId" />
    </el-scrollbar>
  </aside>
</template>

<script setup lang='ts'>
import AsideContents from './aside-contents.vue'
import type { Contents } from '@/types/index'

let isScrollDown = true
const lastScrollY = ref(0)

const contents = ref<Contents[]>([])
const bounding = ref<IntersectionObserverEntry[]>([])

const hightlightId = ref('')
watchEffect(() => {
  if (bounding.value.length > 0) {
    // 如果存在正在交叉的元素
    const allIntersecting = bounding.value.filter(item => item.isIntersecting)
    if (allIntersecting.length) {
      // 高亮 offsetTop - lastScrollY 大于31的第一个交叉的元素
      const index = allIntersecting.findIndex((item) => {
        return (item.target as HTMLHeadElement).offsetTop - lastScrollY.value > 31
      })
      if (index > -1) hightlightId.value = allIntersecting[index].target.id
    }
    else {
      // 如果没有正在交叉的元素，且为向上滚动，那么就高亮最后一个交叉的元素的上一个元素
      if (!isScrollDown) {
        const index = bounding.value.findIndex(item => item.target.id === hightlightId.value)
        hightlightId.value = bounding.value[index - 1].target.id
      }
    }
  }
}, { flush: 'post' })

function createNestedList(arr: NodeListOf<HTMLHeadElement>) {
  const result: Contents[] = []

  let currentH1: Contents | null = null
  let currentH2: Contents | null = null
  let currentH3: Contents | null = null
  let currentH4: Contents | null = null
  let currentH5: Contents | null = null

  arr.forEach((item, index) => {
    item.id = `${item.tagName}-${index}`
    if (item.tagName === 'H1') {
      const listItem = {
        id: item.id,
        title: item.textContent ?? '',
        children: [],
      }

      result.push(listItem)
      currentH1 = listItem
      currentH2 = null
      currentH3 = null
      currentH4 = null
      currentH5 = null
    }
    else if (item.tagName === 'H2') {
      const listItem = {
        id: item.id,
        title: item.textContent ?? '',
        children: [],
      }

      if (currentH1) {
        currentH1.children.push(listItem)
        currentH2 = listItem
        currentH3 = null
        currentH4 = null
        currentH5 = null
      }
      else {
        result.push(listItem)
        currentH1 = null
        currentH2 = listItem
        currentH3 = null
        currentH4 = null
        currentH5 = null
      }
    }
    else if (item.tagName === 'H3') {
      const listItem = {
        id: item.id,
        title: item.textContent ?? '',
        children: [],
      }

      if (currentH2) {
        currentH2.children.push(listItem)
        currentH3 = listItem
        currentH4 = null
        currentH5 = null
      }
      else if (currentH1) {
        currentH1.children.push(listItem)
        currentH2 = null
        currentH3 = listItem
        currentH4 = null
        currentH5 = null
      }
      else {
        result.push(listItem)
        currentH1 = null
        currentH2 = null
        currentH3 = listItem
        currentH4 = null
        currentH5 = null
      }
    }
    else if (item.tagName === 'H4') {
      const listItem = {
        id: item.id,
        title: item.textContent ?? '',
        children: [],
      }

      if (currentH3) {
        currentH3.children.push(listItem)
        currentH4 = listItem
        currentH5 = null
      }
      else if (currentH2) {
        currentH2.children.push(listItem)
        currentH3 = null
        currentH4 = listItem
        currentH5 = null
      }
      else if (currentH1) {
        currentH1.children.push(listItem)
        currentH2 = null
        currentH3 = null
        currentH4 = listItem
        currentH5 = null
      }
      else {
        result.push(listItem)
        currentH1 = null
        currentH2 = null
        currentH3 = null
        currentH4 = listItem
        currentH5 = null
      }
    }
    else if (item.tagName === 'H5') {
      const listItem = {
        id: item.id,
        title: item.textContent ?? '',
        children: [],
      }

      if (currentH4) {
        currentH4.children.push(listItem)
        currentH5 = listItem
      }
      else if (currentH3) {
        currentH3.children.push(listItem)
        currentH4 = null
        currentH5 = listItem
      }
      else if (currentH2) {
        currentH2.children.push(listItem)
        currentH3 = null
        currentH4 = null
        currentH5 = listItem
      }
      else if (currentH1) {
        currentH1.children.push(listItem)
        currentH2 = null
        currentH3 = null
        currentH4 = null
        currentH5 = listItem
      }
      else {
        result.push(listItem)
        currentH1 = null
        currentH2 = null
        currentH3 = null
        currentH4 = null
        currentH5 = listItem
      }
    }
    else {
      const listItem = {
        id: item.id,
        title: item.textContent ?? '',
        children: [],
      }

      if (currentH5) {
        currentH5.children.push(listItem)
      }
      else if (currentH4) {
        currentH4.children.push(listItem)
      }
      else if (currentH3) {
        currentH3.children.push(listItem)
      }
      else if (currentH2) {
        currentH2.children.push(listItem)
      }
      else if (currentH1) {
        currentH1.children.push(listItem)
      }
      else {
        result.push(listItem)
      }
    }
  })

  return result
}

function scrollListener() {
  isScrollDown = window.scrollY > lastScrollY.value
  lastScrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollListener()
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = bounding.value.findIndex(item => item.target.id === entry.target.id)
      if (index > -1) {
        bounding.value[index] = entry
      }
      else {
        bounding.value.push(entry)
      }
    })
  })

  const hTags = document.querySelectorAll<HTMLHeadElement>('h1,h2,h3,h4,h5,h6')
  contents.value = createNestedList(hTags)
  hTags.forEach((item) => {
    const h = document.querySelector<HTMLHeadElement>(`#${item.id}`)
    if (h) observer.observe(h)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    scrollListener()
  })
})
</script>

<style lang='scss' scoped>
.aside-content {
  left: calc(70ch + (100% - 70ch) / 2 - 20px);
  width: 250px;
  padding: 0 20px 0 0;
}
</style>
