<template>
  <div
    v-if="showBack" class="my-20px inline-block cursor-pointer text-20px underline underline-offset-5"
    hover="text-$text-hover"
    @click="$router.push('/blog')"
  >
    cd  . .
  </div>
</template>

<script setup lang='ts'>
const route = useRoute()
const showBack = computed(() => {
  return route.path.startsWith('/blog/')
})
</script>
