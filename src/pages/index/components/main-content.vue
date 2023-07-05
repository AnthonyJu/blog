<template>
  <el-carousel class="blog-box rounded-12px border-none">
    <el-carousel-item
      v-for="index in 4"
      :key="index"
    >
      <img
        :key="index"
        class="banner"
        :src="`https://api.yimian.xyz/img?type=moe&size=1920x1080&index=${index}`"
      >
    </el-carousel-item>
  </el-carousel>

  <div class="mt-20px h-400px flex-center flex-1">
    还没想好放什么😪
  </div>
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
