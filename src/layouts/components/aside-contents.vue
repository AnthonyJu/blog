<template>
  <ul>
    <li v-for="item in contents" :key="item.id" class="pl-20px">
      <a :href="`#${item.id}`" :title="item.title" @click="scrollTo($event, item.id)">
        <p
          class="my-4px truncate text-14px"
          :class="hightlightId === item.id ? 'clip dark:font-900' : 'opacity-85'"
        >
          {{ item.title }}
        </p>
      </a>
      <aside-contents
        v-if="item.children"
        :contents="item.children"
        :hightlight-id="hightlightId"
      />
    </li>
  </ul>
</template>

<script setup lang='ts'>
import type { Contents } from '@/types/index'

defineProps<{ contents: Contents[]; hightlightId: string }>()

function scrollTo(event: Event, id: string) {
  event.preventDefault()
  const h = document.querySelector<HTMLHeadElement>(`#${id}`)
  if (h) {
    window.scrollTo({
      top: h.offsetTop - 91,
      behavior: 'smooth',
    })
  }
}
</script>
