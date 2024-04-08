import { create } from 'zustand'
import { getItem, removeItem, setItem } from '@/utils/storage'

import { type ComponentSize, StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum'

interface SettingsType {
  themeColorPresets: ThemeColorPresets
  themeMode: ThemeMode
  themeLayout: ThemeLayout
  themeStretch: boolean
  breadCrumb: boolean
  multiTab: boolean
  collapsed: boolean
  menuDrawOpen: boolean
  componentSize: `${ComponentSize}`
}
interface SettingStore {
  settings: SettingsType
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setSettings: (settings: Partial<SettingsType>) => void
    clearSettings: () => void
  }
}

const useSettingStore = create<SettingStore>((set, get) => ({
  settings: getItem<SettingsType>(StorageEnum.Settings) || {
    themeColorPresets: ThemeColorPresets.Default,
    themeMode: ThemeMode.Light,
    themeLayout: ThemeLayout.Vertical,
    themeStretch: false,
    breadCrumb: true,
    multiTab: true,
    collapsed: false,
    menuDrawOpen: false,
    componentSize: 'middle',
  },
  actions: {
    setSettings: (settings) => {
      const { settings: defaultSettings } = get()
      const newSettings = { ...defaultSettings, ...settings }
      set({ settings: newSettings })
      setItem(StorageEnum.Settings, newSettings)
    },
    clearSettings() {
      removeItem(StorageEnum.Settings)
    },
  },
}))

export const useSettings = () => useSettingStore(state => state.settings)
export const useSettingActions = () => useSettingStore(state => state.actions)
