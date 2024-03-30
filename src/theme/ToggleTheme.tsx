import { Popover } from 'antd'
import classnames from 'classnames'
import type { ThemeMode } from '@/types/theme'
import { THEME_MODE } from '@/constant'

function upperFirst(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1)}`
}

const iconMap = {
  light: <div className="i-material-symbols:light-mode-outline" />,
  dark: <div className="i-material-symbols:dark-mode-outline" />,
  auto: <div className="i-material-symbols:desktop-windows-outline-rounded" />,
}

interface Props {
  mode: ThemeMode
  onChange: (mode: ThemeMode) => void
}

function ToggleTheme({ mode, onChange }: Props) {
  const modeList = (
    <ul>
      {THEME_MODE.map(m => (
        <li
          key={m}
          // 这里使用了 shortcut `btn`
          className={classnames('btn flex items-center', {
            'text-primary': m === mode,
          })}
          onClick={() => onChange(m)}
        >
          {iconMap[m]}
          <span className="ml-2">{upperFirst(m)}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <Popover placement="bottom" arrow={false} content={modeList} trigger="click">
      {/* 这里使用了 shortcut `btn` */}
      <a className="btn">{iconMap[mode!]}</a>
    </Popover>
  )
}

export default ToggleTheme
