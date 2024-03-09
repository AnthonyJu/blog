import { routes } from 'vue-router/auto-routes'
import type { RouteRecordRaw } from 'vue-router'

// 展开routes获取所有的单个路由
function getAllRoutes(forRoutes: RouteRecordRaw[]) {
  const allRoutes: RouteRecordRaw[] = []
  forRoutes.forEach((route) => {
    if (route.children) {
      allRoutes.push(...getAllRoutes(route.children))
    }
    else {
      allRoutes.push(route)
    }
  })
  return allRoutes
}

export const allRoutes = getAllRoutes(routes).reverse()
export const blogRoutes = allRoutes.filter(page => (page.name as string).startsWith('/blog/') && page.name !== '/blog/')
export const noteRoutes = allRoutes.filter(page => (page.name as string).startsWith('/note/') && page.name !== '/note/')
