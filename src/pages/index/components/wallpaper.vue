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
        @error="handleImgError"
      >
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import img1 from '@/assets/wallpaper/1.jpg'
import img2 from '@/assets/wallpaper/2.jpg'
import img3 from '@/assets/wallpaper/3.jpg'
import img4 from '@/assets/wallpaper/4.jpg'

const imgList = [img1, img2, img3, img4]

function handleImgError(e: any) {
  e.target.src = imgList[e.target.src.split('index=')[1] - 1]
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
