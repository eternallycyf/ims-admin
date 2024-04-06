import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'

import { CircleLoading } from '@/components/Loading'
import { Authorized } from '@/layouts/core'

import type { AppRouteObject } from '#/router'
import { SimpleLayout } from '@/layouts/layout'

const Page403 = lazy(() => import('@/pages/sys/error/Page403'))
const Page404 = lazy(() => import('@/pages/sys/error/Page404'))
const Page500 = lazy(() => import('@/pages/sys/error/Page500'))

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: AppRouteObject = {
  element: (
    <Authorized>
      <SimpleLayout>
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    </Authorized>
  ),
  children: [
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
  ],
}
