import type React from 'react'
import { useCallback, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PageError } from '@/layouts/core'
import { useRouter } from '@/hooks/router'
import { useUserToken } from '@/store/userStore'

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

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
}
