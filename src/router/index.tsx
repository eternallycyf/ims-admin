import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import DashboardLayout from '@/layouts/dashboard/dashboard'
import { Authorized } from '@/Application'
import { ErrorRoutes } from '@/router/error-routes'

import type { AppRouteObject } from '#/router'
import { usePermissionRoutes } from '@/hooks/router'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
}
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
}

export default function Router() {
  const permissionRoutes = usePermissionRoutes()
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <Authorized>
        <DashboardLayout />
      </Authorized>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes],
  }

  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE]

  const router = createHashRouter(routes as unknown as RouteObject[])

  return <RouterProvider router={router} />
}
