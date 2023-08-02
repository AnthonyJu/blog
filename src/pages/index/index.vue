<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="7">
      <Info />
      <Statistic />
    </el-col>
    <el-col :xs="24" :sm="17">
      <MainContent />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Info from './components/info.vue'
import Statistic from './components/statistic.vue'
import MainContent from './components/main-content.vue'
</script>
