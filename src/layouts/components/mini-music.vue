<template>
  <div
    v-show="audioState.isPlaying"
    h-40px flex-center cursor-pointer
    class="fixed right-0 top-383px w-auto rounded-20px bg-light transition-all-1000"
    transform="translate-x-[calc(100%-38px)] hover:translate-x-20px"
  >
    <img
      class="ml-5px mr-10px h-30px w-30px animate-spin animate-duration-2s rounded-15px"
      :src="audioState.poster"
      alt="封面"
    >
    <div
      class="mr-25px flex-center opacity-60"
      hover="opacity-100"
    >
      <div
        class="mx-5px max-w-120px truncate text-black"
        hover="text-primary"
        title="切歌"
        @click="playMusic"
      >
        {{ audioState.title }}
      </div>
      <div
        class="w-32px text-18px text-black" i-carbon-pause-filled
        hover="text-primary"
        title="暂停"
        @click="audioState.audio?.pause()"
      />
    </div>
  </div>
</template>
