<template>
  <ElRow :gutter="20">
    <ElCol :xs="24" :sm="8">
      <Info />
      <Statistic />
      <Music v-show="audioState.audio" />
      <Weather />
    </ElCol>
    <ElCol :xs="24" :sm="16">
      <Carousel />
      <Things />
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import Info from './components/info.vue'
import Statistic from './components/statistic.vue'

import Music from './components/music.vue'
import Weather from './components/weather.vue'
import Carousel from './components/carousel.vue'
import Things from './components/things.vue'
</script>
