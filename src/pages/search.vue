<template>
  <div>
    <el-input
      v-model="searchValue"
      placeholder="Please input"
    />
    <div>
      <el-tag
        v-for="keyword in allKeywords"
        :key="keyword"
        class="cursor-pointer"
        @click="searchValue = keyword"
      >
        {{ keyword }}
      </el-tag>
    </div>
    <div
      v-for="res in results"
      :key="res.path"
      @click="$router.push(res.path)"
    >
      {{ res.meta.title }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import pages from '~pages'
import type { Article } from '@/types/index'

// 筛选出所有以 /blog、/note 开头的路由
const articles = pages.filter((page) => {
  return page.path.startsWith('/blog/') || page.path.startsWith('/note/')
})

// 获取所有文章的关键词
const allKeywords = computed(() => {
  const keywords: string[] = []
  articles.forEach((article) => {
    keywords.push(...article.meta?.keywords as string[] || [])
  })
  return [...new Set(keywords)]
})

// 搜索框的值
const searchValue = ref('')

const results = computed(() => {
  if (!searchValue.value) return []
  else return articles.filter((article) => {
    const keywords = (article.meta?.keywords ?? []) as string[]
    const isKeyword = keywords.includes(searchValue.value)
    const isInTitle = (article.meta?.title as string).includes(searchValue.value)
    return isKeyword || isInTitle
  }) as any as { path: string; meta: Article }[]
})
</script>

<style lang='scss' scoped></style>
