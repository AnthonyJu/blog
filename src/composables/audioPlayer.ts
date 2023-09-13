import axios from 'axios'
import type { AudioState } from '@/types/index'

const AUDIO_SRC = 'https://api.uomg.com/api/rand.music?format=json&sort='

const audioInfo = ref({
  url: '',
  name: '',
  picurl: '',
  artistsname: '',
})

export const sortList = ['热歌榜', '新歌榜', '飙升榜', '抖音榜', '电音榜']

export const audioState: AudioState = reactive({
  sort: '热歌榜',
  audio: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  title: '',
  poster: '',
  artists: '',
})

export async function playMusic() {
  const res = await axios.get(AUDIO_SRC + audioState.sort)
  audioInfo.value = res.data.data

  if (audioState.audio) {
    audioState.audio.src = audioInfo.value.url
    audioState.audio.load()
    audioState.audio.play()
  }
  else {
    audioState.title = audioInfo.value.name
    audioState.poster = audioInfo.value.picurl
    audioState.artists = audioInfo.value.artistsname
    audioState.audio = new Audio(audioInfo.value.url)

    audioState.audio.addEventListener('error', () => {
      audioState.isPlaying = false
      playMusic()
    })

    audioState.audio.addEventListener('canplay', () => {
      audioState.title = audioInfo.value.name
      audioState.poster = audioInfo.value.picurl
      audioState.artists = audioInfo.value.artistsname
    })

    audioState.audio.addEventListener('play', () => {
      audioState.isPlaying = true
    })

    audioState.audio.addEventListener('pause', () => {
      audioState.isPlaying = false
    })

    audioState.audio.addEventListener('timeupdate', () => {
      audioState.currentTime = audioState.audio!.currentTime
    })

    audioState.audio.addEventListener('loadedmetadata', () => {
      audioState.duration = audioState.audio!.duration
    })

    audioState.audio.addEventListener('ended', playMusic)
  }
}

export function useAudioPlayer() {
  watch(() => audioState.sort, playMusic)

  onMounted(playMusic)

  onUnmounted(() => {
    if (!audioState.audio) return
    audioState.audio!.pause()
    audioState.audio!.src = ''
  })
}
