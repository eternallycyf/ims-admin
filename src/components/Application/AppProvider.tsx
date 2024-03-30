import { createContext, useRef } from 'react'
import { createAppProviderContext } from './useAppContext'
import { createBreakpointListen } from '@/hooks/event/useBreakpoint'

export interface AppProviderContextProps {
  prefixCls: string
  isMobile: boolean
}

export const AppProviderContext = createContext<AppProviderContextProps>(undefined)

export function AppProvider({
  children,
  prefixCls,
}: {
  children: React.ReactNode
  prefixCls: string
}) {
  const isMobile = useRef<boolean>(false)

  createBreakpointListen(({ screenMap, sizeEnum, width }) => {
    const lgWidth = screenMap.get(sizeEnum.LG)
    if (lgWidth)
      isMobile.current = width.current - 1 < lgWidth
  })

  createAppProviderContext({ prefixCls, isMobile: isMobile.current })

  const contextValue: AppProviderContextProps = {
    prefixCls,
    isMobile: isMobile.current,
  }

  return <AppProviderContext.Provider value={contextValue}>{children}</AppProviderContext.Provider>
}
