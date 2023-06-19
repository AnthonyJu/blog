<template>
  <el-carousel class="box">
    <el-carousel-item v-for="index in 4" :key="index">
      <img
        :key="index" opacity="100"
        :src="`https://api.yimian.xyz/img?type=moe&size=1920x1080&index=${index}`"
      >
    </el-carousel-item>
  </el-carousel>
</template>

<style lang='scss' scoped>
.box {
  background-color: rgba(124, 168, 255, 0.15);
  border-radius: 12px;
  box-shadow: rgba(142, 142, 142, 0.2) 0 6px 15px 0;
  backdrop-filter: blur(5px);
}
</style>
