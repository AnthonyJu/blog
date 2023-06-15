<template>
  <div class="box flex">
    <div
      v-for="item in statistics"
      :key="item.name"
      class="my-10px flex-col-center flex-1"
    >
      <span class="text-18px">{{ item.count }}</span>
      <span mt-8px>{{ item.name }}</span>
    </div>
  </div>

  <!-- 最新的5条toast -->
  <div class="box mt-20px cursor-pointer px-8px" @click="$router.push('/roast')">
    <p
      v-for="item in roastList.slice(0, 5)"
      :key="item.date"
      class="truncate border-b border-#ccc3 p-8px last:border-none"
      :title="useTimeAgo(item.date).value"
    >
      {{ item.content }}
    </p>
  </div>
  <Weather mt-10px />
</template>

<script setup lang='ts'>
import pages from '~pages'
import roastList from '@/pages/roast/roastList'

const statistics = [
  {
    name: 'blogs',
    count: pages.filter(page => page.path.startsWith('/blog/')).length,
  },
  {
    name: 'notes',
    count: pages.filter(page => page.path.startsWith('/note/')).length,
  },
  {
    name: 'roasts',
    count: roastList.length,
  },
]
</script>

<style lang='scss' scoped>
.box {
  background-color: rgba(124, 168, 255, 0.15);
  border-radius: 12px;
  box-shadow: rgba(142, 142, 142, 0.2) 0 6px 15px 0;
  backdrop-filter: blur(5px);

  div {
    border-right: 1px solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-right: none;
    }
  }
}
</style>
