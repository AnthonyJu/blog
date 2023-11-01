<template>
  <div :class="results.length ? '' : 'mt-100px'">
    <h1 class="clip h-50px text-center text-20px">搜索博客与笔记</h1>
    <ElInput
      v-model="searchValue"
      size="large"
      autofocus
      class="search-input"
      clearable
      :placeholder="placeholder"
      @focus="placeholder = ''"
      @blur="placeholder = '搜索目标为文章标题与关键词'"
    />
    <div class="my-25px max-h-105px flex-center flex-wrap gap-10px overflow-hidden">
      <div
        v-for="keyword in allKeywords"
        :key="keyword"
        size="large"
        class="cursor-pointer rounded-6px px-10px py-4px text-13px shadow"
        bg="#ffffff77 dark:#00000077"
        @click="searchValue = keyword.split(/ \(\s/)[0]"
      >
        <div class="flex-center text-$el-color-primary">
          <p i-el-tag mr-5px class="text-10px text-$el-color-primary" />
          {{ keyword }}
        </div>
      </div>
    </div>
    <div class="grid flex-col-center gap-20px" :class="`grid-cols-${gridNum}`">
      <div
        v-for="res in results"
        :key="res.path"
        flex-col-center
        overflow="hidden"
        class="relative h-100px cursor-pointer rounded-3 p-15px duration-150"
        bg="#ffffff77 dark:#00000077"
        hover="text-18px"
        @click="$router.push(res.path)"
      >
        <div class="badge absolute">
          <span>{{ res.path.startsWith('/blog') ? 'Blog' : 'Note' }}</span>
        </div>
        <p class="w-full flex-1 truncate text-center" :title="res.meta.title">
          {{ res.meta.title }}
        </p>
        <div class="w-full flex-center gap-5px truncate" :title="res.meta.keywords?.join(',')">
          <ElTag v-for="tag in res.meta.keywords" :key="tag" round>
            {{ tag }}
          </ElTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import pages from '~pages'
import type { Article } from '@/types/index'

const { width } = useWindowSize()
// 根据屏幕宽度计算每行显示的博客数量
const gridNum = computed(() => {
  if (width.value <= 500) return 1
  else if (width.value <= 800) return 2
  else return 3
})

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
  --el-input-border-radius: 20px;

  .el-input__wrapper {
    background-color: #fff9;
    box-shadow: 0 0 0 1.5px var(--el-input-border-color, var(--el-border-color)) inset;

    .el-input__inner {
      text-align: center;

      &::placeholder {
        color: #ccc;
        text-align: center;
      }
    }
  }

}

.dark {
  .search-input {
    .el-input__wrapper {
      background-color: transparent;
    }
  }
}

.grid-cols-1 {
  grid-template-columns: repeat(1,minmax(0,1fr));

  .group {
    height: 300px;
  }
}

.grid-cols-2 {
  grid-template-columns: repeat(2,minmax(0,1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3,minmax(0,1fr));
}

.badge {
  top: -5px;
  left: -23px;
  width: 0;
  height: 0;
  border-right: 32px solid transparent;
  border-bottom: 32px solid var(--vp-rainbow);
  border-left: 32px solid transparent;
  transform: rotate(-45deg);

  span {
    position: absolute;
    top: 12px;
    left: -13px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>
