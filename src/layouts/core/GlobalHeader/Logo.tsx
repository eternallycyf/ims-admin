import { NavLink } from 'react-router-dom'
import { useThemeToken } from '@/hooks/theme'

function Logo({ className = '' }: { className?: string }) {
  const { colorPrimary } = useThemeToken()

  return (
    <NavLink to="/" className="no-underline">
      <button className={`font-semibold ${className}`} style={{ color: colorPrimary }}>
        {import.meta.env.VITE_GLOB_APP_TITLE}
      </button>
    </NavLink>
  )
}

export default Logo
