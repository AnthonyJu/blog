<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// https://github.com/vueuse/head
useHead({
  title: 'Ju Peng\'s Blog',
  meta: [
    { name: 'keywords', content: 'Ju Peng, Blog' },
    { name: 'description', content: 'Ju Peng\'s Blog' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#121213' : '#ffffff',
    },
  ],
})

// 检查博客是否有更新
onMounted(() => {
  checkUpdate()
})
</script>
