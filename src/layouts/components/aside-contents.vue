<template>
  <ul pl-20px>
    <li v-for="item in contents" :key="item.id" class="truncate text-14px">
      <a
        :href="`#${item.id}`"
        :title="item.title"
        @click="scrollTo($event, item.id)"
      >
        {{ item.title }}
      </a>
      <aside-contents v-if="item.children" :contents="item.children" />
    </li>
  </ul>
</template>

<script setup lang='ts'>
import type { Contents } from '@/types/index'

defineProps<{ contents: Contents[] }>()

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
