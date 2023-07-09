<template>
  <div>
    <h1 class="h-50px text-center text-20px">搜索博客与笔记</h1>
    <el-input
      v-model="searchValue"
      size="large"
      class="search-input"
      clearable
      :placeholder="placeholder"
      @focus="placeholder = ''"
      @blur="placeholder = '搜索目标为文章标题与关键词'"
    />
    <div class="my-20px max-h-120px flex-center flex-wrap gap-10px overflow-hidden">
      <el-tag
        v-for="keyword in allKeywords"
        :key="keyword"
        size="large"
        class="cursor-pointer"
        @click="searchValue = keyword.split(' (')[0]"
      >
        <div flex-center><p i-el-tag mr-4px />{{ keyword }}</div>
      </el-tag>
    </div>
    <div
      v-for="res in results"
      :key="res.path"
      class="blog-box mb-20px flex flex-wrap cursor-pointer px-20px py-10px"
      @click="$router.push(res.path)"
    >
      <p class="clip flex-1 truncate">{{ res.meta.title }}</p>
      <div class="max-w-50% flex gap-3 truncate">
        <el-tag v-for="tag in res.meta.keywords" :key="tag" round>
          {{ tag }}
        </el-tag>
      </div>
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
  // 计算每个关键词出现的次数
  const keywordsCount = keywords.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, {} as Record<string, number>)
  // 根据关键词出现的次数排序
  keywords.sort((a, b) => {
    return keywordsCount[b] - keywordsCount[a]
  })
  // 将出现的次数拼接到关键词后面
  keywords.forEach((keyword, index) => {
    keywords[index] = `${keyword} ( ${keywordsCount[keyword]} )`
  })
  // 去重，并保留前 15 个
  return [...new Set(keywords)].slice(0, 15)
})

// 搜索框的值
const searchValue = ref('')
const placeholder = ref('搜索目标为文章标题与关键词')

const results = computed(() => {
  if (!searchValue.value) return []
  else return articles.filter((article) => {
    const keywords = (article.meta?.keywords ?? []) as string[]
    const isKeyword = keywords.some((item) => {
      return item.toLowerCase().includes(searchValue.value.toLowerCase())
    })
    const isInTitle = (article.meta?.title as string).includes(searchValue.value)
    return isKeyword || isInTitle
  }) as any as { path: string; meta: Article }[]
})
</script>

<style lang="scss">
.search-input {
  --el-input-border-color: var(--el-color-primary);
  --el-input-hover-border-color: var(--el-color-primary);
  --el-input-border-radius: 16px;

  .el-input__inner {
    text-align: center;

    &::placeholder {
      text-align: center;
    }
  }
}
</style>
