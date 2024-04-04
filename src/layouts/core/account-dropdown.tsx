import type { MenuProps } from 'antd'
import { Divider } from 'antd'
import type { DropdownProps } from 'antd/es/dropdown/dropdown'
import Dropdown from 'antd/es/dropdown/dropdown'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useLoginStateContext } from '@/Application'
import { IconButton } from '@/components/icon'
import { useUserActions, useUserInfo } from '@/store/userStore'
import { useRouter } from '@/hooks/router'
import { useThemeToken } from '@/hooks/theme'

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
  const { replace } = useRouter()
  const { username, email, avatar } = useUserInfo()
  const { clearUserInfoAndToken } = useUserActions()
  const { backToLogin } = useLoginStateContext()
  const { t } = useTranslation()
  const logout = () => {
    try {
      // todo const logoutMutation = useMutation(userService.logout);
      // todo logoutMutation.mutateAsync();
      clearUserInfoAndToken()
      backToLogin()
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    finally {
      replace('/login')
    }
  }
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken()

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  }

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  }

  const dropdownRender: DropdownProps['dropdownRender'] = menu => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{username}</div>
        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  )

  const items: MenuProps['items'] = [
    { label: <NavLink to={HOMEPAGE}>{t('sys.menu.dashboard')}</NavLink>, key: '0' },
    {
      label: <NavLink to="/management/user/profile">{t('sys.menu.user.profile')}</NavLink>,
      key: '1',
    },
    {
      label: <NavLink to="/management/user/account">{t('sys.menu.user.account')}</NavLink>,
      key: '2',
    },
    { type: 'divider' },
    {
      label: <button className="text-warning font-bold">{t('sys.login.logout')}</button>,
      key: '3',
      onClick: logout,
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
      </IconButton>
    </Dropdown>
  )
}
