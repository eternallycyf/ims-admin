import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { CircleLoading } from '@/components/Loading'
import Iconify from '@/components/icon/IconifyIcon'

import type { AppRouteObject } from '#/router'
import { Page403, Page404, Page500 } from '@/layouts/core'

const errors: AppRouteObject[] = [
  {
    path: 'error',
    order: 6,
    element: (
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    ),
    meta: {
      label: 'sys.menu.error.index',
      icon: <Iconify icon="bxs:error-alt" className="ant-menu-item-icon" size="24" />,
      key: '/error',
    },
    children: [
      {
        path: '403',
        element: <Page403 />,
        meta: {
          label: 'sys.menu.error.403',
          key: '/error/403',
        },
      },
      {
        path: '404',
        element: <Page404 />,
        meta: {
          label: 'sys.menu.error.404',
          key: '/error/404',
        },
      },
      {
        path: '500',
        element: <Page500 />,
        meta: {
          label: 'sys.menu.error.500',
          key: '/error/500',
        },
      },
    ],
  },
]

export default errors
