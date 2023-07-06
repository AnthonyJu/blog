<template>
  <aside class="aside-content fixed top-140px">
    <el-scrollbar height="500px">
      <AsideContents :contents="contents" />
    </el-scrollbar>
  </aside>
</template>

<script setup lang='ts'>
import AsideContents from './aside-contents.vue'
import type { Contents } from '@/types/index'

const contents = ref<Contents[]>([])

onMounted(() => {
  const hTags = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
  contents.value = createNestedList(hTags)
})

function createNestedList(arr: NodeListOf<Element>) {
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
</script>

<style lang='scss' scoped>
.aside-content {
  left: calc(70ch + (100% - 70ch) / 2 - 20px);
  width: 250px;
  padding: 0 20px 0 0;
}
</style>
