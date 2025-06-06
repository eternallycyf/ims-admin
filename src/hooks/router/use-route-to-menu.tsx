import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '@/store/settingStore'

import { ThemeLayout } from '#/enum'
import type { AppRouteObject } from '#/router'
import { IconifyIcon, SvgIcon } from '@/components'
import type { MenuItem } from '@/store/useMenuInfo'

/**
 *   routes -> menus
 */
export function useRouteToMenuFn() {
  const { t } = useTranslation()
  const { themeLayout } = useSettings()
  const routeToMenuFn = useCallback(
    (items: AppRouteObject[]) => {
      return items
        .filter(item => !item.meta?.hideMenu)
        .map((item) => {
          const menuItem: any = []
          const { meta, children } = item
          if (meta) {
            const { key, label, icon, disabled, suffix } = meta
            menuItem.key = key
            menuItem.disabled = disabled
            menuItem.label = (
              <div
                className={`inline-flex items-center ${
                  themeLayout === ThemeLayout.Horizontal
                    ? 'justify-start'
                    : 'justify-between'
                } `}
              >
                <div className="">{t(label as any)}</div>
                {suffix}
              </div>
            )
            if (icon) {
              if (typeof icon === 'string') {
                if (icon.startsWith('ic')) {
                  menuItem.icon = (
                    <SvgIcon
                      icon={icon}
                      size={24}
                      className="ant-menu-item-icon"
                    />
                  )
                }
                else {
                  menuItem.icon = (
                    <IconifyIcon
                      icon={icon}
                      size={24}
                      className="ant-menu-item-icon"
                    />
                  )
                }
              }
              else {
                menuItem.icon = icon
              }
            }
          }
          if (children)
            menuItem.children = routeToMenuFn(children)

          return menuItem as MenuItem
        })
    },
    [t, themeLayout],
  )
  return routeToMenuFn
}
