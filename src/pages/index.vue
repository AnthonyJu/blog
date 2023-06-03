<template>
  <div class="full flex-col-center">
    <img
      class="min-w-180px w-15% animate-tada cursor-pointer rounded-50%"
      hover="animate-spin"
      src="@/assets/avatar.png"
    >
    <p class="my-30px text-20px">Ju Peng's Mini Site</p>
    <div class="flex-center flex-wrap gap-5">
      <a
        v-for="site in sites"
        :key="site.name"
        :href="site.url"
        :title="site.name"
        target="_blank"
        class="flex-center text-18px text-#3f9dff transition-all duration-200"
        hover="text-#c784ed scale-110 dark:text-#57f0e6"
      >
        <div :class="site.icon" mr-2 />{{ site.name }}
      </a>
    </div>
    <p class="mb-100px mt-30px animate-bounce-in text-20px">今朝有酒今朝醉，I can do this all day。</p>
  </div>
  <Background />
</template>

<route lang='yaml'>
meta:
  layout: none
</route>

<script setup lang='ts'>
const sites = [
  {
    name: 'Blog',
    url: 'https://blog.jupeng.top/',
    icon: 'i-carbon-blog',
  },
  {
    name: 'Github',
    url: 'https://github.com/AnthonyJu',
    icon: 'i-carbon-logo-github',
  },
  {
    name: 'Email',
    url: 'mailto:1662345805@qq.com',
    icon: 'i-carbon-email',
  },
]
</script>
