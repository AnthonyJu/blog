<template>
  <div class="matted-box flex">
    <routerLink
      v-for="item in statistics"
      :key="item.name"
      :to="item.path"
      hover="text-$text-hover"
      class="my-10px flex-col-center flex-1"
    >
      <span text-18px>{{ item.count }}</span>
      <span>{{ item.name }}</span>
    </routerLink>
  </div>

  <!-- 最新的5条toast -->
  <div
    class="matted-box mt-20px cursor-pointer px-8px"
    @click="$router.push('/roast')"
  >
    <p
      v-for="item in roastList.slice(0, 5)"
      :key="item.date"
      :title="`${useTimeAgo(item.date).value}：${item.content}`"
      class="truncate border-b border-#fff6 p-8px last:border-none"
    >
      {{ item.content }}
    </p>
  </div>
</template>

<script setup lang='ts'>
import pages from '~pages'
import roastList from '@/pages/roast/roastList'

const statistics = [
  {
    name: 'blogs',
    path: '/blog',
    count: pages.filter(page => page.path.startsWith('/blog/')).length,
  },
  {
    name: 'notes',
    path: '/note',
    count: pages.filter(page => page.path.startsWith('/note/')).length,
  },
  {
    name: 'roasts',
    path: '/roast',
    count: roastList.length,
  },
]
</script>
