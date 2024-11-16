import type React from 'react'
import { lazy, useCallback, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useUserToken } from '@/store/userStore'
import { useRouter } from '@/hooks/router'

const PageError = lazy(() => import('@/layouts/core/Error/PageError'))

interface Props {
  children: React.ReactNode
}

export function Authorized({ children }: Props) {
  const router = useRouter()
  const { accessToken } = useUserToken()

  const check = useCallback(() => {
    if (!accessToken)
      router.replace('/login')
  }, [router, accessToken])

  useEffect(() => {
    check()
  }, [check])

  return (
    <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
  )
}
