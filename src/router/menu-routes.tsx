import { Navigate } from 'react-router-dom'

import { Authorized } from '@/layouts/core'
import { getRoutesFromModules } from '@/router/utils'

import type { AppRouteObject } from '#/router'
import { BasicLayout } from '@/layouts/layout'

const menuModuleRoutes = getRoutesFromModules()

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

/**
 * dynamic routes
 */
export const menuRoutes: AppRouteObject = {
  path: '/',
  element: (
    <Authorized>
      <BasicLayout />
    </Authorized>
  ),
  children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...menuModuleRoutes],
}
