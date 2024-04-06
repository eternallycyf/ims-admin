import React from 'react'
import { HeaderSimple } from '@/layouts/core'
import { useThemeToken } from '@/hooks/theme'

interface Props {
  children: React.ReactNode
}
export default function SimpleLayout({ children }: Props) {
  const { colorBgElevated, colorTextBase } = useThemeToken()
  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{
        color: colorTextBase,
        background: colorBgElevated,
      }}
    >
      <HeaderSimple />
      {children}
    </div>
  )
}
