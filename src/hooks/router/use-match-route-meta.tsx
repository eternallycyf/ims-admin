import { useEffect, useState } from 'react'
import type { Params } from 'react-router-dom'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import { isEmpty } from 'lodash'
import { useFlattenedRoutes } from './use-flattened-routes'
import { useRouter } from './use-router'

import type { RouteMeta } from '#/router'

/**
 * 返回当前路由Meta信息
 */
export function useMatchRouteMeta() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>()

  // 获取路由组件实例
  const children = useOutlet()

  // 获取所有匹配的路由
  const matchs = useMatches()
  const location = useLocation()

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes()

  // const pathname = usePathname();
  const { push } = useRouter()

  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matchs.at(-1)
    if (!lastRoute)
      return

    const { pathname, params } = lastRoute
    const currentRouteMeta = flattenedRoutes.find((item) => {
      const replacedKey = replaceDynamicParams(item.key, params)
      return replacedKey === pathname || `${replacedKey}/` === pathname
    })

    if (currentRouteMeta) {
      currentRouteMeta.outlet = children
      if (!isEmpty(params)) {
        currentRouteMeta.params = params
        currentRouteMeta.multiple = true
      }

      if (location?.search)
        currentRouteMeta.search = location?.search

      if (location?.state)
        currentRouteMeta.state = location?.state

      setMatchRouteMeta({ ...currentRouteMeta })
    }
    else {
      push(HOMEPAGE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchs])

  return matchRouteMeta
}

/**
 * replace `user/:id`  to `/user/1234512345`
 */
export function replaceDynamicParams(menuKey: string, params: Params<string>) {
  let replacedPathName = menuKey

  // 解析路由路径中的参数名称
  const paramNames = menuKey.match(/:\w+/g)

  if (paramNames) {
    paramNames.forEach((paramName) => {
      // 去掉冒号，获取参数名称
      const paramKey = paramName.slice(1)
      // 检查params对象中是否有这个参数
      if (params[paramKey]) {
        // 使用params中的值替换路径中的参数
        replacedPathName = replacedPathName.replace(paramName, params[paramKey]!)
      }
    })
  }

  return replacedPathName
}
