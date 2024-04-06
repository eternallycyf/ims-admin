import { NavLink } from 'react-router-dom'
import { useThemeToken } from '@/hooks/theme'
import { useSettings } from '@/store/settingStore'
import LogoPng from '@/assets/images/base/logo.png'

function Logo({ className = '' }: { className?: string }) {
  const { colorPrimary } = useThemeToken()
  const { collapsed } = useSettings()

  return (
    <NavLink to="/" className="no-underline">
      <button className={`font-semibold ${className}`} style={{ color: colorPrimary }}>
        {collapsed ? <img w-8 h-8 src={LogoPng} /> : 'ims-admin' }
      </button>
    </NavLink>
  )
}

export default Logo
