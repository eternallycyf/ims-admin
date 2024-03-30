import { useMemo } from 'react'
import { usePreferredDark } from './usePreferredDark'
import type { ThemeMode } from '@/types/theme'

export function useDark(mode: ThemeMode): boolean {
  const preferredDark = usePreferredDark()

  const isDark = useMemo(() => {
    return mode === 'dark' || (preferredDark && mode !== 'light')
  }, [mode, preferredDark])

  return isDark
}
