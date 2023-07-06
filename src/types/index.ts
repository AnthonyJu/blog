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
