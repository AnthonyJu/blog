<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8">
      <MyInfo />
      <Statistics />
      <MusicPlayer v-show="audioState.audio" />
      <Weather />
    </el-col>
    <el-col :xs="24" :sm="16">
      <Wallpaper />
      <RandomBlog />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import MyInfo from './index/components/my-info.vue'
import Statistics from './index/components/statistics.vue'

import MusicPlayer from './index/components/music-player.vue'
import Weather from './index/components/weather.vue'
import Wallpaper from './index/components/wallpaper.vue'
import RandomBlog from './index/components/random-blog.vue'
</script>
