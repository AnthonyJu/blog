<template>
  <div class="h-500px w-full flex-col-center">
    <iframe :src="src" w-full flex-1 />
    <div class="mt-20px w-full gap-10px">
      <el-button type="primary" @click="openNewTab(href)">
        查看完整代码
        <svg
          width="16" height="16"
          viewBox="0 0 16 16"
          class="ml-6px fill-current"
        >
          <path d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z" />
          <path fill="none" d="M0 0h16v16H0z" />
        </svg>
      </el-button>
      <el-button type="primary" @click="openNewTab(src)">
        在新窗口查看
        <svg
          width="16" height="16"
          viewBox="0 0 16 16"
          class="ml-6px fill-current"
        >
          <path d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z" />
          <path fill="none" d="M0 0h16v16H0z" />
        </svg>
      </el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{ route: string }>()

const src = computed(() => {
  if (props.route.startsWith('http')) return props.route
  return `https://vitesse-plain-pro.netlify.app/#${props.route}?demo=true`
})

const href = computed(() => {
  // 如果props.route只含有一个/，则路径为 /pages${props.route}/index.vue
  if (props.route.split('/').length === 2) {
    return `https://github.com/AnthonyJu/vitesse-plain-pro/blob/main/src/pages${props.route}/index.vue`
  }
  else {
    return `https://github.com/AnthonyJu/vitesse-plain-pro/blob/main/src/pages${props.route}.vue`
  }
})

function openNewTab(url: string) {
  window.open(url, '_blank')
}
</script>
