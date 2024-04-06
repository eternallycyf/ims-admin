import { Breadcrumb } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useMatches } from 'react-router-dom'

import { menuFilter } from '@/router/utils'

import type { AppRouteObject } from '#/router'
import { useFlattenedRoutes, usePermissionRoutes } from '@/hooks/router'
import { useMenuInfo, useMenuInfoActions } from '@/store/useMenuInfo'

/**
 * 动态面包屑解决方案：https://github.com/MinjieChang/myblog/issues/29
 */
export default function BreadCrumb() {
  const { t } = useTranslation()
  const matches = useMatches()

  const menuUserInfo = useMenuInfo()
  const { setRouteInfo } = useMenuInfoActions()
  const { breadCrumbList } = menuUserInfo

  const flattenedRoutes = useFlattenedRoutes()
  const permissionRoutes = usePermissionRoutes()

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes)
    const paths = matches.filter(item => item.pathname !== '/').map(item => item.pathname)

    const pathRouteMetas = flattenedRoutes.filter(item => paths.includes(item.key))

    let items: AppRouteObject[] | undefined = [...menuRoutes]
    const breadCrumbList = pathRouteMetas.map((routeMeta) => {
      const { key, label } = routeMeta
      items = items!
        .find(item => item.meta?.key === key)
        ?.children?.filter(item => !item.meta?.hideMenu)
      const result: ItemType = {
        key,
        title: t(label),
      }
      if (items) {
        result.menu = {
          items: items.map(item => ({
            key: item.meta?.key,
            label: <Link to={item.meta!.key!}>{t(item.meta!.label)}</Link>,
          })),
        }
      }
      return result
    })

    setRouteInfo({ breadCrumbList })
  }, [matches, flattenedRoutes, t, permissionRoutes])

  return <Breadcrumb items={breadCrumbList} />
}
