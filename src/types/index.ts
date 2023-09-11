export interface Note {
  title: string
  keywords: string[]
  path: string
  date: string
}

export interface NoteType {
  name: string
  icon: string
  darkIcon?: string
  notes?: Note[]
}

export interface BlogInfo extends Note {
  desc: string
  poster: string
}

export interface Article extends Note {
  desc?: string
  poster?: string
}

export interface Contents {
  id: string
  title: string
  children: Contents[]
}

export interface AudioState {
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
