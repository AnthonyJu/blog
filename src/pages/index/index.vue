<template>
  <el-row :gutter="15">
    <el-col :xs="24" :sm="7" :lg="6">
      <Left />
      <Right v-if="width < 1200" />
    </el-col>
    <el-col :xs="24" :sm="17" :lg="12">
      <CenterContent />
    </el-col>
    <el-col v-if="width >= 1200" :lg="6">
      <Right />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Left from './components/left.vue'
import Right from './components/right.vue'
import CenterContent from './components/center.vue'

const { width } = useWindowSize()
</script>
