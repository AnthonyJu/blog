<template>
  <div v-if="isShow" tabindex="-1" class="el-image-viewer__wrapper" style="z-index: 2004">
    <!-- Mask -->
    <div class="el-image-viewer__mask opacity-75 -z-1" />

    <!-- Close -->
    <span class="el-image-viewer__btn el-image-viewer__close" @click="isShow = false">
      <div i-carbon-close />
    </span>

    <!-- Arrow -->
    <span class="el-image-viewer__btn el-image-viewer__prev" @click="leftArrowClick">
      <div i-carbon-chevron-left />
    </span>
    <span class="el-image-viewer__btn el-image-viewer__next" @click="rightArrowClick">
      <div i-carbon-chevron-right />
    </span>

    <!-- Actions -->
    <div class="el-image-viewer__btn el-image-viewer__actions">
      <div class="el-image-viewer__actions__inner">
        <div i-carbon-zoom-out cursor-pointer @click="zoomOutClick" />
        <div i-carbon-zoom-in cursor-pointer @click="zoomInClick" />
        <div />
        <div i-carbon-rotate cursor-pointer @click="rotate -= 90" />
        <div i-carbon-rotate-180 cursor-pointer @click="rotate += 90" />
      </div>
    </div>

    <!-- Images -->
    <div ref="drag" class="el-image-viewer__canvas !select-auto" :style="dragStyle">
      <img
        v-for="(src, index) in previewList"
        v-show="nowIndex === index"
        :key="src"
        :src="src"
        :style="imgStyle"
        class="el-image-viewer__img select-none !max-h-full !max-w-full"
        transition="transform 300"
        @dblclick="zoomInClick"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import 'element-plus/theme-chalk/el-image-viewer.css'

const route = useRoute()
const queryTarget = ref<HTMLElement | null>(null)
const previewList = ref<string[]>([])
const isShow = ref(false)
const nowIndex = ref(0)

const zoom = ref(1)
const rotate = ref(0)
const x = ref(0)
const y = ref(0)

const imgStyle = computed(() => ({
  transform: `scale(${zoom.value}) rotate(${rotate.value}deg)`,
}))
const dragStyle = computed(() => ({
  transform: `translate(${x.value}px, ${y.value}px)`,
}))

watch(() => route.path, () => {
  if (route.path.startsWith('/blog/') || route.path.startsWith('/note/')) {
    // 定时获取 .query-target
    const timer = setInterval(() => {
      queryTarget.value = document.querySelector('.query-target')
      if (queryTarget.value) {
        clearInterval(timer)
        previewList.value = []
        window.addEventListener('keydown', onKeydown)
        // 监听滚轮滚动
        window.addEventListener('wheel', onWheel, { passive: false })
      }
    }, 100)
  }
  else {
    reset()
    isShow.value = false
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('wheel', onWheel)
  }
}, {
  flush: 'post',
  immediate: true,
})

function onWheel(event: WheelEvent) {
  if (!isShow.value) return

  const deltaY = event.deltaY
  if (deltaY > 0) {
    // 向下滚动
    zoomOutClick()
  }
  else if (deltaY < 0) {
    // 向上滚动
    zoomInClick()
  }
  event.preventDefault()
}

function onKeydown(event: KeyboardEvent) {
  if (isShow.value && event.key === 'Escape') {
    isShow.value = false
  }
}

watchEffect(() => {
  if (queryTarget.value) {
    // 获取 .query-target 下所有图片
    const images = document.querySelectorAll<HTMLImageElement>('.query-target img')
    // 为每个图片添加点击事件
    images.forEach((img, index) => {
      img.classList.add('cursor-pointer')
      previewList.value.push(img.src)
      img.addEventListener('click', () => {
        reset()
        isShow.value = true
        nowIndex.value = index
      })
    })
    // 为所有的代码块增加复制功能
    addCodeCopy()
  }
})

const { copy: copyFn, copied, isSupported } = useClipboard()
watchEffect(() => {
  if (copied.value) {
    ElMessage.success('复制成功')
  }
})
function addCodeCopy() {
  if (!isSupported.value) return
  const pres = document.querySelectorAll<HTMLElement>('.query-target pre.shiki')
  pres.forEach((pre) => {
    const code = pre.querySelector('code')
    if (code) {
      const copy = document.createElement('div')
      copy.classList.add('absolute', 'top-6px', 'right-5px', 'cursor-pointer', 'hover:opacity-75')
      copy.title = '复制代码'
      copy.innerHTML = '<div i-carbon-copy />'
      copy.addEventListener('click', () => {
        copyFn(code.innerText)
      })
      const parent = pre.parentNode as HTMLDivElement
      parent.classList.add('relative')
      parent.appendChild(copy)
    }
  })
}

let startX = 0
let startY = 0
const drag = ref<HTMLElement | null>(null)

watch(drag, () => {
  window.addEventListener('mousedown', (event) => {
    const target = event.target as HTMLElement
    if (target?.tagName === 'IMG') {
      onMouseDown(event)
      event.target?.addEventListener('dragstart', e => e.preventDefault())
      target.classList.add('!transition-none')
    }
  })
})

function onMouseDown(event: MouseEvent) {
  startX = event.pageX
  startY = event.pageY
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(event: MouseEvent) {
  x.value += event.pageX - startX
  y.value += event.pageY - startY
  startX = event.pageX
  startY = event.pageY
}

function onMouseUp(event: MouseEvent) {
  (event.target as HTMLElement).classList.remove('!transition-none')
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

function leftArrowClick() {
  reset()
  if (nowIndex.value === 0) {
    nowIndex.value = previewList.value.length - 1
  }
  else {
    nowIndex.value--
  }
}

function rightArrowClick() {
  reset()
  if (nowIndex.value === previewList.value.length - 1) {
    nowIndex.value = 0
  }
  else {
    nowIndex.value++
  }
}

function zoomInClick() {
  if (zoom.value < 8) {
    zoom.value *= 1.2
  }
}

function zoomOutClick() {
  if (zoom.value > 0.2) {
    zoom.value /= 1.2
  }
}

function reset() {
  zoom.value = 1
  rotate.value = 0
  x.value = 0
  y.value = 0
}
</script>
