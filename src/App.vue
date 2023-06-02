<template>
  <RouterView />
</template>

<script setup lang="ts">
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
