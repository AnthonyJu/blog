<template>
  <div class="clip mt-20px text-right text-20px">随机文章</div>
  <div
    v-for="blog in blogs"
    :key="blog.path"
    class="matted-box mt-26px h-160px flex overflow-hidden transition duration-500 ease-in-out"
    cursor="pointer"
    hover="scale-103"
    @click="() => $router.push(blog.path)"
  >
    <!-- poster -->
    <img
      class="h-160px w-200px"
      object="cover"
      :src="blog.poster"
      :alt="blog.title"
    >
    <div class="flex-col-center flex-1 py-6px">
      <!-- title -->
      <div class="my-10px" :title="blog.title">
        {{ blog.title }}
      </div>
      <!-- desc -->
      <div class="flex-center flex-1 px-26px indent-2em" :title="blog.title">
        {{ blog.desc }}
      </div>

      <div class="my-10px flex-center">
        <!-- tags -->
        <div class="flex-center gap-5px truncate" :title="blog.keywords?.join(',')">
          <el-tag v-for="tag in blog.keywords" :key="tag" round>
            {{ tag }}
          </el-tag>
        </div>

        <!-- date -->
        <div class="ml-26px flex-center text-14px" :title="`编写于：${blog.date}`">
          <div i-carbon-calendar-heat-map mr-5px />
          <div>{{ blog.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { BlogInfo } from '@/types/index'
import pages from '~pages'

const allBlogs = getAllBlogs(pages)

// 随机获取3篇blog
const blogs = computed(() => {
  const randomBlogs: BlogInfo[] = []
  while (randomBlogs.length < 3 && allBlogs.length > 0) {
    const index = Math.floor(Math.random() * allBlogs.length)
    const blog = allBlogs[index]
    if (!randomBlogs.includes(blog)) {
      randomBlogs.push(blog)
    }
  }
  return randomBlogs
})
</script>

<style lang='scss' scoped>

</style>
