<template>
  <div class="grid flex-col-center gap-20px" :class="`grid-cols-${gridNum}`">
    <div
      v-for="blog in blogs"
      :key="blog.title"
      class="group h-250px flex-col-center cursor-pointer overflow-hidden rounded-3"
      bg="#ffffff99 dark:#00000099"
      @click="$router.push(blog.path)"
    >
      <!-- poster -->
      <div class="relative w-full flex-1 overflow-hidden rounded-t-3">
        <img
          class="full transition duration-1000 ease-in-out"
          object="cover"
          :src="blog.poster"
          :alt="blog.title"
          group-hover="scale-120"
        >
        <div
          class="hidden full flex-center animate-fade-in bg-#000000aa p-10px"
          text="center #fff 14px"
          position="absolute top-0"
          group-hover="flex"
        >
          {{ blog.desc }}
        </div>
      </div>

      <!-- info -->
      <div class="group h-100px w-full flex-col-center justify-around py-4px">
        <!-- title -->
        <div class="clip w-full truncate text-center" :title="blog.title">
          {{ blog.title }}
        </div>

        <!-- tags -->
        <div class="w-full flex-center gap-5px truncate" :title="blog.keywords?.join(',')">
          <el-tag v-for="tag in blog.keywords" :key="tag" round>
            {{ tag }}
          </el-tag>
        </div>

        <!-- date -->
        <div class="flex-center text-14px opacity-65" :title="`编写于：${blog.date}`">
          <div i-carbon-calendar-heat-map mr-5px />
          <div>{{ blog.date }}</div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination v-model="current" m-auto w-fit :total="allBlogs.length" />
  </div>
</template>

<script setup lang='ts'>
import AvatarPng from '@/assets/avatar.png'
import type { BlogInfo } from '@/types/index'
import pages from '~pages'

const { width } = useWindowSize()
// 根据屏幕宽度计算每行显示的博客数量
const gridNum = computed(() => {
  if (width.value <= 500) return 1
  else if (width.value <= 800) return 2
  else return 3
})

// 获取所有博客的封面图
const allPoster = import.meta.glob<{ default: string }>('./**/poster.png', { eager: true })

// 取出所有以 /blog/ 开头的bole路由
const allBlogs = pages.filter(page => page.path.startsWith('/blog/')).map((page) => {
  const posterPath = `./${page.path.replace('/blog/', '')}/poster.png`
  return {
    ...page.meta,
    path: page.path,
    poster: allPoster[posterPath]?.default ?? AvatarPng,
  }
}) as any as BlogInfo[]

// 当前页
const current = ref(1)
const blogs = computed(() => allBlogs.slice((current.value - 1) * 15, current.value * 15))
</script>

<style lang='scss' scoped>
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

::v-deep(.el-pagination) {
  --el-pagination-bg-color: transparent;

  button.is-disabled,
  button:disabled {
    background: transparent;
  }
}
</style>
