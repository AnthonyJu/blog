<template>
  <div class="clip h-47px flex-center pt-20px text-18px">
    <span class="truncate px-10px" :title="oneWord">{{ oneWord }}</span>
  </div>
  <router-link
    v-for="blog in randomBlogs"
    :key="blog.path"
    class="matted-box mt-20px h-160px flex overflow-hidden transition duration-400 ease-in-out"
    cursor="pointer"
    :to="blog.path"
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
        class="hidden-2 px-26px indent-2em"
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
  </router-link>
</template>

<script setup lang='ts'>
import axios from 'axios'

interface OneWordRes {
  data: {
    success: boolean
    data: {
      vhan: string
      source: string
    }
  }
}

// 获取随机一言 https://api.vvhan.com/api/ian?type=json
const { width } = useWindowSize()
const oneWord = ref('前进吧，星星在你的头上闪耀哦！')
onMounted(() => {
  if (width.value > 600) {
    axios.get('https://api.vvhan.com/api/ian?type=json')
      .then((res: OneWordRes) => {
        if (res.data.success) {
          oneWord.value = `${res.data.data.vhan} ——${res.data.data.source}`
        }
      })
  }
})
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

.matted-box:hover {
  box-shadow: 0 0 20px #86ddea;
}

.dark .matted-box:hover {
  box-shadow: 0 0 20px #688ed6;
}
</style>
