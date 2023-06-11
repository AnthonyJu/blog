export interface BlogInfo {
  title: string
  desc: string
  tags: string[]
  path: string
  date: string
}

export interface Note {
  title: string
  tags: string[]
  path: string
  date: string
}

export interface NoteType {
  name: string
  icon: string
  darkIcon?: string
  notes?: Note[]
}
