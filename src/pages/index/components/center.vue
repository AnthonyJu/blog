<template>
  <el-carousel height="240px" class="box">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 class="full flex-center" text="2xl">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.box {
  background-color: rgba(124, 168, 255, 0.15);
  border-radius: 12px;
  box-shadow: rgba(142, 142, 142, 0.2) 0 6px 15px 0;
  backdrop-filter: blur(5px);
}
</style>
