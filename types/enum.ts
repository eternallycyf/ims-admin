export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum StorageEnum {
  User = 'user',
  Token = 'token',
  Settings = 'settings',
  I18N = 'language',
  MenuRouteInfo = 'menuRouteInfo',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export enum ComponentSize {
  Small = 'small',
  Middle = 'middle',
  Large = 'large',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}

export enum MultiTabOperation {
  FULLSCREEN = 'fullscreen',
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHERS = 'closeOthers',
  CLOSEALL = 'closeAll',
  CLOSELEFT = 'closeLeft',
  CLOSERIGHT = 'closeRight',
}

export enum PermissionType {
  CATALOGUE,
  MENU,
  BUTTON,
}

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}
