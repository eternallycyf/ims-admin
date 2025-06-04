/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GLOB_APP_TITLE: 'ims-admin'
  readonly VITE_PREFIXCLS: 'ims'
  readonly VITE_ROUTER_TYPE: 'static' | 'dynamic'
  readonly VITE_APP_BASE_API: '/api'
  readonly VITE_APP_HOMEPAGE: '/dashboard/workbench'
  readonly VITE_APP_ENV: 'development' | 'production'
  readonly VITE_APP_BASE_PATH: '/'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
