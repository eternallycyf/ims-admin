import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'

export interface RouteMeta {
  /**
   * antd menu selectedKeys
   */
  key: string
  /**
   * menu label, i18n
   */
  label: string
  /**
   * menu prefix icon
   */
  icon?: ReactNode
  /**
   * menu suffix icon
   */
  suffix?: ReactNode
  /**
   * hide in menu
   */
  hideMenu?: boolean
  /**
   * hide in multi tab
   */
  hideTab?: boolean
  /**
   * disable in menu
   */
  disabled?: boolean
  /**
   * react router outlet
   */
  outlet?: any
  /**
   * use to refresh tab
   */
  timeStamp?: string
  /**
   * external link and iframe need
   */
  frameSrc?: string
  /**
   * multiple dynamic routing params
   */
  params?: any
  /**
   * route search
   */
  search?: any
  /**
   * route state
   */
  state?: any
}
export type AppRouteObject = {
  order?: number
  meta?: RouteMeta
  children?: AppRouteObject[]
} & Omit<RouteObject, 'children'>
