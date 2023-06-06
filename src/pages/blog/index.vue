<template>
  <div class="flex-col-center">
    <div class="grid w-full gap-20px" :class="`grid-cols-${gridNum}`">
      <div
        v-for="blog in blogs" :key="blog.path"
        class="h-250px flex-col-center overflow-hidden rounded-3 bg-#ffffff99 dark:bg-#00000099"
      >
        <!-- poster -->
        <img
          class="h-150px w-full"
          object="cover"
          :src="getImg(blog.meta!.poster as string)"
        >

        <!-- title -->
        <div
          class="flex-center flex-1 px-10px pt-5px"
          cursor="pointer"
          @click="$router.push(blog.path)"
        >
          {{ blog.meta!.title }}
        </div>

        <!-- date -->
        <div class="flex items-end px-10px pb-10px text-left text-14px opacity-55">
          <div i-carbon-calendar-heat-map mr-5px />
          <div>{{ blog.meta!.date }}</div>
        </div>
      </div>
    </div>

    <el-pagination
      class="mt-40px rounded-20px bg-light-100 px-10px py-4px dark:bg-dark-600"
      layout="prev, pager, next"
      :total="50"
    />
  </div>
</template>

<script setup lang='ts'>
import pages from '~pages'

const { width } = useWindowSize()

const gridNum = computed(() => {
  if (width.value <= 500) return 1
  else if (width.value <= 800) return 2
  else return 3
})

const blogs = pages.filter(page => page.path.startsWith('/blog/'))
function getImg(poster: string) {
  return new URL(`/src/assets/blog/${poster}`, import.meta.url).href
}
</script>

<style lang='scss' scoped>
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
