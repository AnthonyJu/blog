<template>
  <div
    v-if="isBlog || isNote"
    class="my-20px inline-block cursor-pointer text-20px underline underline-offset-5"
    hover="text-$text-hover"
    @click="goBack()"
  >
    cd . .
  </div>
</template>

<script setup lang='ts'>
const route = useRoute()
const router = useRouter()

const isBlog = computed(() => {
  return route.path.startsWith('/blog/')
})
const isNote = computed(() => {
  return route.path.startsWith('/note/')
})

function goBack() {
  if (isBlog.value) {
    router.push('/blog')
  }
  else if (isNote.value) {
    router.push('/note')
  }
  else {
    router.push('/')
  }
}
</script>
