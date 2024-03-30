import { createContext, useContext } from 'react'
import { AppProviderContext, type AppProviderContextProps } from './AppProvider'

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context)
}

export function useAppProviderContext() {
  const context = useContext(AppProviderContext)
  return context
}
