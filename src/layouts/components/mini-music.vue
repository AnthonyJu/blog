<template>
  <div
    v-show="showMini"
    h-40px flex-center cursor-pointer
    class="fixed right-0 top-383px w-auto rounded-20px bg-light transition-all-1000"
    transform="translate-x-[calc(100%-38px)] hover:translate-x-20px"
  >
    <img
      class="ml-5px mr-10px h-30px w-30px animate-duration-2s rounded-15px"
      :class="audioState.isPlaying ? 'animate-spin' : ''"
      :src="audioState.poster"
      alt="封面"
    >
    <div
      class="mr-25px flex-center text-black opacity-70"
    >
      <div
        class="mx-5px max-w-120px truncate"
        hover="text-primary"
        title="切歌"
        @click="playMusic"
      >
        {{ audioState.title }}
      </div>
      <div
        v-show="audioState.isPlaying"
        class="w-30px text-18px" i-carbon-pause-filled
        hover="text-primary"
        title="暂停"
        @click="audioState.audio?.pause()"
      />
      <div
        v-show="!audioState.isPlaying"
        class="w-30px text-16px" i-carbon-play-filled-alt
        hover="text-primary"
        title="播放"
        @click="audioState.audio?.play()"
      />
      <div
        class="w-30px text-16px" i-ep-close-bold
        hover="text-primary"
        title="关闭"
        @click="stopMusic"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const canShow = ref(false)

const showMini = computed(() => {
  return audioState.audio && (audioState.isPlaying || canShow.value)
})

watchEffect(() => {
  if (audioState.isPlaying) {
    canShow.value = true
  }
})

function stopMusic() {
  audioState.audio?.pause()
  canShow.value = false
}
</script>
