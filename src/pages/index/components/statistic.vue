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

  <!-- 天气 -->
  <div mt-10px h-50px flex-center>
    <div id="he-plugin-simple" />
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

useScriptTag('https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0')

onMounted(() => {
  window.WIDGET = {
    CONFIG: {
      modules: '01234',
      background: '5',
      tmpColor: '2FC9FC',
      tmpSize: '16',
      cityColor: '2FC9FC',
      citySize: '16',
      aqiColor: '2FC9FC',
      aqiSize: '16',
      weatherIconSize: '24',
      alertIconSize: '18',
      // padding: '10px 10px 10px 10px',
      shadow: '0',
      language: 'auto',
      fixed: 'false',
      vertical: 'top',
      horizontal: 'left',
      key: '17ebff6847284776a60b12280a5e36c3',
    },
  }
})
</script>

<style lang='scss' scoped>
::v-deep(#he-plugin-simple) {
  pointer-events: none;

  .module {
    color: #409eff !important;
  }

  .s-sticker-cond {
    position: relative;
    top: -1px;
    left: 4px;
    padding: 0;

    img {
      max-width: 24px;
    }
  }

}
</style>
