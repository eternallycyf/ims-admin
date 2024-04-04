import type React from 'react'
import { useCallback, useEffect } from 'react'

import { useRouter } from '@/hooks/router/use-router.ts'
import { useUserToken } from '@/store/userStore.ts'

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

  return children
}
