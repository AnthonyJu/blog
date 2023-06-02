<template>
  <div class="flex-col-center">
    <div class="grid w-full gap-20px" :class="`grid-cols-${gridNum}`">
      <div
        v-for="i in 15" :key="i"
        class="h-250px flex-col-center overflow-hidden rounded-3 bg-#ffffff99 dark:bg-#00000099"
      >
        <img h-150px w-full src="@/assets/article.png">

        <div flex-center flex-1 px-10px pt-5px>
          文章即将上线，敬请期待
        </div>

        <div class="flex items-end px-10px pb-10px text-left text-14px opacity-55">
          <div i-carbon-calendar-heat-map mr-5px />
          <div>{{ formatTimeAgo(new Date('2023-03-02')) }} (2023-03-02)</div>
        </div>
      </div>
    </div>

    <!-- <el-pagination
      class="bg-light-100 rounded-20px mt-40px py-4px px-10px dark:bg-dark-600"
      layout="prev, pager, next"
      :total="50"
    /> -->
  </div>
</template>

<script setup lang='ts'>
import { formatTimeAgo } from '@vueuse/core'

const { width } = useWindowSize()

const gridNum = computed(() => {
  if (width.value <= 500) return 1
  else if (width.value <= 800) return 2
  else return 3
})
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
