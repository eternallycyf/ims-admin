import { useCallback, useEffect } from 'react'

import { useRouter } from '@/hooks/router/use-router'
import { useUserToken } from '@/store/userStore'

interface Props {
  children: React.ReactNode
}
export default function AuthGuard({ children }: Props) {
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
