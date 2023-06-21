<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="7" :lg="6">
      <Info />
      <Statistic />
    </el-col>
    <el-col :xs="24" :sm="17" :lg="18">
      <MainContent />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Info from './components/info.vue'
import Statistic from './components/statistic.vue'
import MainContent from './components/main-content.vue'
</script>
