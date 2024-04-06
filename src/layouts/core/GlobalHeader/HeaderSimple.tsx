import { SettingButton } from '../index'
import { Logo } from '@/layouts/core'

export default function HeaderSimple() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6">
      <Logo />
      <SettingButton />
    </header>
  )
}
