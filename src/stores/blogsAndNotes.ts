import AvatarPng from '@/assets/avatar.png'
import type { BlogInfo, Note } from '@/types/index'
import pages from '~pages'

// 获取所有博客的封面图
const allPoster = import.meta.glob<{ default: string }>(
  '../pages/blog/**/poster.png',
  { eager: true },
)

// 获取所有博客的信息
export const allBlogs = pages
  .filter(page => page.path.startsWith('/blog/'))
  .map((page) => {
    const posterPath = `../pages${page.path}/poster.png`
    return {
      path: page.path,
      poster: allPoster[posterPath]?.default ?? AvatarPng,
      ...page.meta,
    }
  }) as BlogInfo[]

export const allNotes = pages.filter(page => page.path.startsWith('/note/')).map((page) => {
  return {
    ...page.meta,
    path: page.path,
  }
}) as Note[]
