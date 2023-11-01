<template>
  <div relative pb-70px pt-50px>
    <div class="circle-org" />
    <div class="circle-blue" />
    <div :key="cssCode" m-auto h-180px w-300px flex-center :style="cssCode">Matted Glass</div>
  </div>

  <div>
    不同场景下需要的效果也不一样🧐，每次都需要去一点一点的调试代码，这样很麻烦😪，
    所以我把这些效果封装成了一个功能组件，只需要对某些固定的参数进行修改，再直接拷贝代码就可以了😊。
  </div>

  <ElRow :gutter="20">
    <ElCol :span="12" :xs="24">
      <div class="blog-box mt-30px p-16px">
        <div>圆角</div>
        <ElSlider v-model="radius" />
        <div mt-8px>模糊</div>
        <ElSlider v-model="blur" :max="20" />
        <div mt-8px>透明</div>
        <ElSlider v-model="opacity" :format-tooltip="(val) => val / 100" />
      </div>
    </ElCol>
    <ElCol :span="12" :xs="24">
      <div class="blog-box mt-30px px-15px py-10px">
        <div flex-b-c pb-6px>
          <span text-primary>代码实现</span>
          <ElButton type="primary" link size="default" title="copy" @click="copy(cssCode)">
            <div i-carbon:copy />
          </ElButton>
        </div>
        <div v-html="cssCode.replaceAll(';', ';<br />')" />
      </div>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
const radius = ref(25)
const blur = ref(5)
const opacity = ref(25)

const cssCode = computed(() => {
  return `
    background-color: rgba(255, 255, 255, ${opacity.value / 100});
    border: 1px solid rgba(255, 255, 255, ${opacity.value / 100});
    border-radius: ${radius.value}px;
    box-shadow: rgba(142, 142, 142, ${opacity.value / 100}) 0 6px 15px 0;
    backdrop-filter: blur(${blur.value}px);
  `
})

const { copy, copied } = useClipboard({ source: cssCode })

watch(copied, (val) => {
  if (val) ElMessage.success('复制成功')
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
  bottom: 10%;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg,#de82ca,#5ee7f5);
  border-radius: 50%;
  animation: bounce-down 8s linear infinite;
}

@keyframes bounce-down {
  0% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>
