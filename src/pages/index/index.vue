<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="7" :lg="6">
      <Left />
    </el-col>
    <el-col :xs="24" :sm="17" :lg="12">
      <CenterContent />
    </el-col>
    <el-col hidden-sm-and-down :lg="6">
      <Right />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Left from './components/left.vue'
import Right from './components/right.vue'
import CenterContent from './components/center.vue'
</script>

<style>
/* TODO hidden-sm-and-down */
</style>
