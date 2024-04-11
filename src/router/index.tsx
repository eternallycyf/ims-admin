import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'
import { t } from 'i18next'
import BasicLayout from '@/layouts/layout/BasicLayout'
import { Authorized } from '@/layouts/core'
import { ErrorRoutes } from '@/router/error-routes'

import type { AppRouteObject } from '#/router'
import { useMatchRouteMeta, usePermissionRoutes } from '@/hooks/router'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/layouts/core/Login/Login')),
}
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
}

function Title() {
  const currentRouteMeta = useMatchRouteMeta()
  const GLOBAL_TITLE = import.meta.env.VITE_GLOB_APP_TITLE
  return (
    <Helmet>
      <title>
        {currentRouteMeta?.key === import.meta.env.VITE_APP_HOMEPAGE
          ? GLOBAL_TITLE
          : t(currentRouteMeta?.label) || GLOBAL_TITLE}
      </title>
    </Helmet>
  )
}

export default function Router() {
  const permissionRoutes = usePermissionRoutes()
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <Authorized>
        <Title />
        <BasicLayout />
      </Authorized>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes],
  }

  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE]

  const router = createHashRouter(routes as unknown as RouteObject[])

  return <RouterProvider router={router} />
}
