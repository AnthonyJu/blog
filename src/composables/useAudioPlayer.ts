import axios from 'axios'
import type { AudioState } from '@/types/index'

const AUDIO_SRC = 'https://api.uomg.com/api/rand.music?format=json&sort='

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

export default function useAudioPlayer() {
  watch(() => audioState.sort, playMusic)

  async function playMusic() {
    const res = await axios.get(AUDIO_SRC + audioState.sort)
    const { name, picurl, artistsname, url } = res.data.data
    audioState.title = name
    audioState.poster = picurl
    audioState.artists = artistsname

    if (audioState.audio) {
      audioState.audio.src = url
      audioState.audio.load()
      audioState.audio.play()
    }
    else {
      audioState.audio = new Audio(url)

      audioState.audio.addEventListener('play', () => {
        audioState.isPlaying = true
      })

      audioState.audio.addEventListener('pause', () => {
        audioState.isPlaying = false
      })

      audioState.audio.addEventListener('volumechange', () => {
        audioState.volume = audioState.audio!.volume
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

  onMounted(playMusic)

  onUnmounted(() => {
    if (!audioState.audio) return
    audioState.audio!.pause()
    audioState.audio!.src = ''
  })
}
