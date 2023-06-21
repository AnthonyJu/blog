<template>
  <el-carousel class="bg-box rounded-12px border-none p-0">
    <el-carousel-item
      v-for="index in 4"
      :key="index"
    >
      <img :key="index" class="banner" :src="`https://api.yimian.xyz/img?type=moe&size=1920x1080&index=${index}`">
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
