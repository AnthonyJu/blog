<template>
  <div class="flex-col-center">
    <div class="grid w-full gap-20px" :class="`grid-cols-${gridNum}`">
      <div
        v-for="blog in blogs" :key="blog.title"
        class="blog relative h-250px flex-col-center overflow-hidden rounded-3"
        bg="#ffffff99 dark:#00000099"
        cursor="pointer"
        @click="$router.push(blog.path)"
      >
        <!-- poster -->
        <div class="h-150px w-full overflow-hidden">
          <img
            class="full transition duration-1000 ease-in-out"
            object="cover"
            :src="blog.poster"
            :alt="blog.title"
            @error="blog.poster = PosterPng"
          >
        </div>

        <div
          class="desc absolute top-0 hidden h-150px flex-center animate-fade-in bg-#000000aa p-10px"
          text="center #fff 14px"
        >
          {{ blog.desc }}
        </div>

        <div class="w-full flex-col-center flex-1 justify-around py-4px">
          <!-- title -->
          <div class="truncate" :title="blog.title">
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
    </div>

    <!-- Pagination -->
    <Pagination v-model="current" m-auto w-fit :total="allBlogs.length" />
  </div>
</template>

<script setup lang='ts'>
import PosterPng from '@/assets/avatar.png'
import type { BlogInfo } from '@/types/index'
import pages from '~pages'

const { width } = useWindowSize()
// 根据屏幕宽度计算每行显示的博客数量
const gridNum = computed(() => {
  if (width.value <= 500) return 1
  else if (width.value <= 800) return 2
  else return 3
})

// 取出所有以 /blog/ 开头的bole路由
const allBlogs = pages.filter(page => page.path.startsWith('/blog/')).map((page) => {
  return {
    ...page.meta,
    path: page.path,
  }
}) as any as BlogInfo[]

// 获取所有博客的封面图
const allPoster = import.meta.glob<{ default: string }>('./**/poster.png')

// 当前页
const current = ref(1)
const blogs = ref<BlogInfo[]>()

// 监听页码变化
watchEffect(() => {
  blogs.value = allBlogs.slice((current.value - 1) * 15, current.value * 15)
  // 获取图片
  blogs.value.forEach((blog) => {
    allPoster[`./${blog.path.replace('/blog/', '')}/poster.png`]().then((url) => {
      blog.poster = url.default
    })
  })
})
</script>

<style lang='scss' scoped>
.blog {
  &:hover {
    img {
      transform: scale(1.2);
    }

    .desc {
      display: flex;
    }
  }
}

.grid-cols-1 {
  grid-template-columns: repeat(1,minmax(0,1fr));
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
