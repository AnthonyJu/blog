<template>
  <div relative py-50px>
    <div class="circle-org" />
    <div class="circle-blue" />
    <div :key="cssCode" m-auto h-180px w-300px :style="cssCode.replaceAll('<br />', '')" />
  </div>

  <div mb-20px>
    其次是不同场景下需要的毛玻璃效果也不一样，每次都需要去一点一点的调试代码，
    这样很麻烦，所以我把这些效果都封装成了一个功能组件，只需要对某些固定的参数进行修改就可以了。
  </div>

  <el-row :gutter="20">
    <el-col :span="12">
      <div>圆角</div>
      <el-slider v-model="radius" />
      <div mt-8px>模糊</div>
      <el-slider v-model="blur" :max="20" />
      <div mt-8px>透明</div>
      <el-slider v-model="opacity" :format-tooltip="(val) => val / 100" />
    </el-col>
    <el-col :span="12">
      <div mb-8px>代码实现</div>
      <div v-html="cssCode" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
const radius = ref(25)
const blur = ref(5)
const opacity = ref(25)

const cssCode = computed(() => {
  return `
    border-radius: ${radius.value}px;<br />
    backdrop-filter: blur(${blur.value}px);<br />
    box-shadow: rgba(142, 142, 142, ${opacity.value / 100}) 0 6px 15px 0;<br />
    background-color: rgba(255, 255, 255, ${opacity.value / 100});<br />
    border: 1px solid rgba(255, 255, 255, ${opacity.value / 100});<br />
  `
})
</script>

<style>
.circle-org {
  position: absolute;
  top: 0;
  left: 20%;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg,#ffb566,#f67);
  border-radius: 50%;
  animation: bounce-down 5s linear infinite;
}

.circle-blue {
  position: absolute;
  right: 20%;
  bottom: 5%;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg,#de82ca,#259fac);
  border-radius: 50%;
  animation: bounce-down 8s linear infinite;
}
</style>
