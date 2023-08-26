<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="7">
      <Info />
      <Statistic />
      <!-- <Player /> -->
      <Weather />
    </el-col>
    <el-col :xs="24" :sm="17">
      <Carousel />
      <Things />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Info from './components/info.vue'
import Statistic from './components/statistic.vue'

// import Player from './components/player.vue'
import Weather from './components/weather.vue'
import Carousel from './components/carousel.vue'
import Things from './components/things.vue'
</script>
