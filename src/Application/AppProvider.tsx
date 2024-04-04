import { createContext } from 'react'
import { createAppProviderContext } from './useAppContext'

export interface AppProviderContextProps {
  prefixCls: string
}

export const AppProviderContext = createContext<AppProviderContextProps>(undefined)

export function AppProvider({
  children,
  prefixCls,
}: {
  children: React.ReactNode
  prefixCls: string
}) {
  createAppProviderContext({ prefixCls })

  const contextValue: AppProviderContextProps = {
    prefixCls,
  }

  return <AppProviderContext.Provider value={contextValue}>{children}</AppProviderContext.Provider>
}
