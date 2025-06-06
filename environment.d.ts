declare namespace NodeJS {
  export interface ProcessEnv {
    readonly VITE_GLOB_APP_TITLE: 'ims-admin';
    readonly VITE_APP_BASE_API: '/api';
    readonly VITE_ROUTER_TYPE: 'static' | 'dynamic';
    readonly VITE_APP_HOMEPAGE: '/dashboard/workbench';
    readonly VITE_APP_ENV: 'development' | 'production';
    readonly VITE_APP_BASE_PATH: '/';
  }
}
