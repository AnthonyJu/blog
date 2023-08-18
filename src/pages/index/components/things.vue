<template>
  <div class="clip pt-17px text-center text-18px">隔着人潮呼救像只困兽，呼吸颤抖去泪流，去相拥。</div>
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
      class="h-160px"
      :class="width > 600 ? 'w-210px' : 'w-45%'"
      object="cover"
      :src="blog.poster"
      :alt="blog.title"
    >
    <div class="flex-col-center flex-1 py-6px">
      <!-- title -->
      <div class="my-10px">
        {{ blog.title }}
      </div>
      <!-- desc -->
      <div
        v-show="width > 600"
        class="hidden-2 h-50px flex-center px-26px indent-2em"
        :title="blog.desc"
      >
        {{ blog.desc }}
      </div>

      <div class="my-10px flex-center flex-wrap gap-15px">
        <!-- tags -->
        <div class="flex-center gap-5px truncate">
          <el-tag v-for="tag in blog.keywords" :key="tag" round>
            {{ tag }}
          </el-tag>
        </div>

        <!-- date -->
        <div class="flex-center text-14px">
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

// 随机获取4篇blog
const blogs = computed(() => {
  const randomBlogs: BlogInfo[] = []
  while (randomBlogs.length < 4 && allBlogs.length > 0) {
    const index = Math.floor(Math.random() * allBlogs.length)
    const blog = allBlogs[index]
    if (!randomBlogs.includes(blog)) {
      randomBlogs.push(blog)
    }
  }
  return randomBlogs
})

const { width } = useWindowSize()
</script>

<style lang='scss' scoped>
// 超出两行省略
.hidden-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; // 行数
  -webkit-box-orient: vertical;
}
</style>
