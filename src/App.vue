<template>
  <el-config-provider :locale="zhCn">
    <router-view />
    <ClientOnly>
      <PreviewAndCodeCopy />
    </ClientOnly>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

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
</script>
