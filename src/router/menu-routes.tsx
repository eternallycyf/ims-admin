import { Navigate } from 'react-router-dom'

import { Authorized } from '@/Application/Authorized'
import { getMenuModules } from '@/router/utils'

import type { AppRouteObject } from '#/router'
import { DashboardLayout } from '@/layouts/dashboard'

const menuModuleRoutes = getMenuModules()

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

/**
 * dynamic routes
 */
export const menuRoutes: AppRouteObject = {
  path: '/',
  element: (
    <Authorized>
      <DashboardLayout />
    </Authorized>
  ),
  children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...menuModuleRoutes],
}
