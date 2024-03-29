<template>
  <div class="matted-box relative mt-20px h-86px flex items-center overflow-hidden p-10px">
    <!-- 播放与暂停 -->
    <div
      class="absolute h-66px w-66px flex-center"
      :class="audioState.isPlaying ? '' : 'bg-black bg-opacity-30'"
    >
      <div
        v-show="!audioState.isPlaying"
        class="cursor-pointer text-30px text-white opacity-70"
        hover="opacity-100"
        i-ic-outline-play-circle-outline
        title="播放"
        @click="audioState.audio?.play()"
      />
      <div
        v-show="audioState.isPlaying"
        class="ml-36px mt-30px cursor-pointer text-20px text-white opacity-70"
        hover="opacity-100"
        i-ic-outline-pause-circle-outline
        title="暂停"
        @click="audioState.audio?.pause()"
      />
    </div>

    <!-- 封面 -->
    <img class="h-66px w-66px" :src="audioState.poster">

    <!-- 类型切换 -->
    <el-dropdown
      class="top-0 cursor-pointer !absolute -right-2px"
      size="large"
      popper-class="music-type-dropdown"
      @command="handleCmd"
    >
      <div class="text-22px" i-carbon-playlist />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="sort in sortList" :key="sort" :command="sort">
            <span :class="audioState.sort === sort ? 'text-$el-color-primary' : ''">
              {{ sort }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 标题与进度 -->
    <div class="h-full w-[calc(100%-66px)] flex-col justify-between pl-8px">
      <div class="mt-8px flex-center">
        <div
          class="mr-8px cursor-pointer text-green"
          i-fxemoji-musicalnote
          title="切歌"
          @click="playMusic"
        />
        <p
          class="flex-1 truncate"
          :title="`${audioState.title} - ${audioState.artists}`"
        >
          {{ audioState.title }}
          <span class="text-14px"> - {{ audioState.artists }}</span>
        </p>
      </div>
      <div class="mt-6px flex-center">
        <el-slider
          v-model="audioState.currentTime"
          class="flex-1"
          :max="audioState.duration"
          @input="setCurrentTime"
        />
        <p class="w-64px pb-2px pl-10px text-center text-14px">
          {{ `- ${getRemainTime}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { Arrayable } from 'element-plus/lib/utils/typescript'

// 设置当前播放时间
function setCurrentTime(time: Arrayable<number>) {
  audioState.audio!.currentTime = time as number
}

// 处理命令
function handleCmd(cmd: string) {
  audioState.sort = cmd
}

// 当前剩余时间
const getRemainTime = computed(() => formatTime(audioState.duration - audioState.currentTime))

// 格式化时间
function formatTime(time: number) {
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)

  // 不满10补0
  const minStr = min < 10 ? `0${min}` : `${min}`
  const secStr = sec < 10 ? `0${sec}` : `${sec}`

  return `${minStr}:${secStr}`
}
</script>

<style lang='scss' scoped>
::v-deep(.el-slider) {
  .el-slider__bar {
    border-radius: var(--el-slider-border-radius);
  }

  .el-slider__button-wrapper {
    display: none;
  }
}

::v-deep(.music-type-dropdown) {
  background: transparent;
}
</style>

<style lang='scss'>
.music-type-dropdown.el-dropdown__popper.el-popper {
  background: transparent;
  backdrop-filter: blur(12px);
  border: none;
  box-shadow: none;

  .el-dropdown-menu {
    background-color: rgb(124 168 255 / 20%);
    border: none;
    border-radius: 8px;
  }

  .el-dropdown-menu__item:not(.is-disabled):focus {
    /* stylelint-disable-next-line custom-property-pattern */
    --el-dropdown-menuItem-hover-fill: transparent;
  }

  .el-popper__arrow::before {
    background-color: rgb(124 168 255 / 20%);
    backdrop-filter: blur(12px);
    border: none;
  }
}
</style>
