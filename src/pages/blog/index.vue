<template>
  <div
    class="grid gap-20px"
    style="grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));"
  >
    <div
      v-for="blog in blogList"
      :key="blog.title"
      class="blog-item group h-260px flex-col-center cursor-pointer overflow-hidden rounded-3"
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
          class="hidden full flex-center animate-fade-in bg-#000000aa p-16px indent-2em"
          text="center #fff 14px justify"
          position="absolute top-0"
          group-hover="flex"
        >
          {{ blog.desc }}
        </div>
      </div>

      <!-- info -->
      <div class="group h-100px w-full flex-col-center justify-around py-4px">
        <!-- title -->
        <div class="w-full truncate text-center" :title="blog.title">
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
  <Pagination v-model="current" class="m-auto w-fit !mt-20px" :total="allBlogs.length" />
</template>

<script setup lang='ts'>
import { allBlogs } from '@/stores/blogs'

const current = ref(1)
const blogList = computed(() => {
  const start = (current.value - 1) * 15
  const end = start + 15
  return allBlogs.value.slice(start, end)
})
</script>

<style lang='scss' scoped>
::v-deep(.el-pagination) {
  --el-pagination-bg-color: transparent;

  button.is-disabled,
  button:disabled {
    background: transparent;
  }
}
</style>
