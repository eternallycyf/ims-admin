import _ from 'lodash'

import type { AppRouteObject, RouteMeta } from '#/router'

/**
 * return menu routes
 */
export function menuFilter(items: AppRouteObject[]) {
  return _.chain(items)
    .filter((item) => {
      const show = item.meta?.key
      if (show && item.children)
        item.children = menuFilter(item.children)

      return !!show
    })
    .sortBy(item => item.order || Number.POSITIVE_INFINITY)
    .value()
}

/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getRoutesFromModules() {
  const menuModules: AppRouteObject[] = []

  const modules = import.meta.glob('./modules/**/*.tsx', { eager: true })
  Object.keys(modules).forEach((key) => {
    const mod = (modules as any)[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    menuModules.push(...modList)
  })
  return menuModules
}

/**
 * return the routes will be used in sidebar menu
 */
export function getMenuRoutes(appRouteObjects: AppRouteObject[]) {
  if (import.meta.env.VITE_ROUTER_TYPE === 'static')
    return menuFilter(getRoutesFromModules())

  return menuFilter(appRouteObjects)
}

/**
 * return flatten routes
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { meta, children } = item
    if (meta)
      prev.push(meta)
    if (children)
      prev.push(...flattenMenuRoutes(children))
    return prev
  }, [])
}
