import { SettingButton } from './'
import { Logo } from '@/layouts/components'

export default function HeaderSimple() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6">
      <Logo />
      <SettingButton />
    </header>
  )
}
