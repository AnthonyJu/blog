interface Note {
  title: string
  keywords: string[]
  path: string
  date: string
}

interface NoteType {
  name: string
  icon: string
  darkIcon?: string
  notes?: Note[]
}

interface BlogInfo extends Note {
  desc: string
  poster: string
}

interface Article extends Note {
  desc?: string
  poster?: string
}

interface Contents {
  id: string
  title: string
  children: Contents[]
}

interface AudioState {
  sort: string
  audio: HTMLAudioElement | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  title: string
  poster: string
  artists: string
}
