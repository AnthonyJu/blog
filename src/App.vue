<template>
  <RouterView />
  <!-- <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider> -->
</template>

<script setup lang="ts">
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// https://github.com/vueuse/head
useHead({
  title: 'JuPeng\'s Blog',
  meta: [
    { name: 'description', content: '鞠鹏的个人博客网站' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
})
</script>
