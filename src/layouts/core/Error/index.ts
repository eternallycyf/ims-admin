import { lazy } from 'react'

export const Page403 = lazy(() => import('@/layouts/core/Error/Page403'))
export const Page404 = lazy(() => import('@/layouts/core/Error/Page404'))
export const Page500 = lazy(() => import('@/layouts/core/Error/Page500'))

export { default as PageError } from './PageError'
