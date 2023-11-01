<template>
  <div class="h-500px w-full flex-col-center">
    <iframe :src="src" w-full flex-1 />
    <div class="mt-20px w-full gap-10px">
      <ElButton type="primary" @click="openNewTab(href)">
        查看完整代码
        <svg
          width="16" height="16"
          viewBox="0 0 16 16"
          class="ml-6px fill-current"
        >
          <path d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z" />
          <path fill="none" d="M0 0h16v16H0z" />
        </svg>
      </ElButton>
      <ElButton type="primary" @click="openNewTab(src)">
        在新窗口查看
        <svg
          width="16" height="16"
          viewBox="0 0 16 16"
          class="ml-6px fill-current"
        >
          <path d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z" />
          <path fill="none" d="M0 0h16v16H0z" />
        </svg>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{ route: string }>()

const src = computed(() => {
  if (props.route.startsWith('http')) return props.route
  return `https://jupeng-demo.netlify.app/#${props.route}`
})
const href = `https://github.com/AnthonyJu/demo/blob/main/src/pages${props.route}.vue`

function openNewTab(url: string) {
  window.open(url, '_blank')
}
</script>
