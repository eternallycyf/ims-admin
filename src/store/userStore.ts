import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import type { SignInReq } from '@/api/services/userService'
import userService from '@/api/services/userService'
import { getItem, removeItem, setItem } from '@/utils/storage'

import type { UserInfo, UserToken } from '#/entity'
import { StorageEnum } from '#/enum'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

interface UserStore {
  userInfo: Partial<UserInfo>
  userToken: UserToken
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserInfo) => void
    setUserToken: (token: UserToken) => void
    clearUserInfoAndToken: () => void
  }
}

const useUserStore = create<UserStore>(set => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo })
      setItem(StorageEnum.User, userInfo)
    },
    setUserToken: (userToken) => {
      set({ userToken })
      setItem(StorageEnum.Token, userToken)
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} })
      removeItem(StorageEnum.User)
      removeItem(StorageEnum.Token)
    },
  },
}))

export const useUserInfo = () => useUserStore(state => state.userInfo)
export const useUserToken = () => useUserStore(state => state.userToken)
export const useUserPermission = () => useUserStore(state => state.userInfo.permissions)
export const useUserActions = () => useUserStore(state => state.actions)

export function useSignIn() {
  const { t } = useTranslation()
  const navigatge = useNavigate()
  const { notification, message } = App.useApp()
  const { setUserToken, setUserInfo } = useUserActions()

  const signInMutation = useMutation({
    mutationFn: userService.signin,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data
      setUserToken({ accessToken, refreshToken })
      setUserInfo(user)
      navigatge(HOMEPAGE, { replace: true })

      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${data?.user?.username ?? '--'}`,
        duration: 3,
      })
    },
    onError: (err) => {
      message.warning({
        content: err.message,
        duration: 3,
      })
    },
  })

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data)
      const { user, accessToken, refreshToken } = res
      setUserToken({ accessToken, refreshToken })
      setUserInfo(user)
      navigatge(HOMEPAGE, { replace: true })

      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${data.username}`,
        duration: 3,
      })
    }
    catch (err) {
      message.warning({
        // @ts-expect-error
        content: err?.message,
        duration: 3,
      })
    }
  }

  return useCallback(signIn, [])
}
