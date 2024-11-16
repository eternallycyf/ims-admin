import { create } from 'zustand'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import type { BreadcrumbProps } from 'antd/lib/breadcrumb'
import type { GetProp } from 'antd'
import { getItem, removeItem, setItem } from '@/utils/storage'
import { StorageEnum } from '#/enum'
import type { KeepAliveTab } from '@/hooks/router'

export type MenuItem = GetProp<BreadcrumbProps, 'items'>[number]

interface MenuRouteInfo {
  breadCrumbList: ItemType[]
  tabsList: KeepAliveTab[]
}

interface UserMenuRouteInfo {
  menuRouteInfo: MenuRouteInfo

  actions: {
    setRouteInfo: (settings: Partial<MenuRouteInfo>) => void
    clearRouteInfo: () => void
  }
}

const useMenuRouteInfo = create<UserMenuRouteInfo>((set, get) => ({
  menuRouteInfo: getItem<MenuRouteInfo>(StorageEnum.MenuRouteInfo) || {
    breadCrumbList: [],
    tabsList: [],
  },
  actions: {
    setRouteInfo: (menuRouteInfo) => {
      const { menuRouteInfo: defaultMenuRouteInfo } = get()
      const newMenuRouteInfo = { ...defaultMenuRouteInfo, ...menuRouteInfo }
      set({ menuRouteInfo: newMenuRouteInfo })
      setItem(StorageEnum.MenuRouteInfo, newMenuRouteInfo)
    },
    clearRouteInfo() {
      removeItem(StorageEnum.MenuRouteInfo)
    },
  },
}))

export function useMenuInfo() {
  return useMenuRouteInfo(state => state.menuRouteInfo)
}
export function useMenuInfoActions() {
  return useMenuRouteInfo(state => state.actions)
}
