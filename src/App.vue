<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
    <ClientOnly>
      <PreviewAndCodeCopy />
    </ClientOnly>
  </ElConfigProvider>
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
