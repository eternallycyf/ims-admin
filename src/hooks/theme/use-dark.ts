import { useMemo } from 'react'
import { usePreferredDark } from './use-preferred-dark'
import type { ThemeMode } from '#/enum'
import type { ValueOf } from '#/utils'

export function useDark(mode: ValueOf<typeof ThemeMode>): boolean {
  const preferredDark = usePreferredDark()

  const isDark = useMemo(() => {
    return mode === 'dark' || (preferredDark && mode !== 'light')
  }, [mode, preferredDark])

  return isDark
}
