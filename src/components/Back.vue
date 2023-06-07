<template>
  <div
    class="my-20px inline-block cursor-pointer text-20px underline underline-offset-5"
    hover="text-$text-hover"
    @click="$router.push(path)"
  >
    cd . .
  </div>
</template>

<script setup lang='ts'>
defineProps<{ path: string }>()
</script>
