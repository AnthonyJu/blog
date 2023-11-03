<template>
  <ElRow :gutter="20">
    <ElCol :xs="24" :sm="8">
      <MyInfo />
      <Statistics />
      <MusicPlayer v-show="audioState.audio" />
      <Weather />
    </ElCol>
    <ElCol :xs="24" :sm="16">
      <Wallpaper />
      <RandomBlog />
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import MyInfo from './components/my-info.vue'
import Statistics from './components/statistics.vue'

import MusicPlayer from './components/music-player.vue'
import Weather from './components/weather.vue'
import Wallpaper from './components/wallpaper.vue'
import RandomBlog from './components/random-blog.vue'
</script>
