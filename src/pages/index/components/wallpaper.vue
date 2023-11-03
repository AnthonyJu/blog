<template>
  <ElCarousel class="blog-box rounded-12px border-none">
    <ElCarouselItem
      v-for="index in 4"
      :key="index"
    >
      <img
        :key="index"
        class="banner"
        :src="`https://api.yimian.xyz/img?type=moe&size=1920x1080&index=${index}`"
      >
    </ElCarouselItem>
  </ElCarousel>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
