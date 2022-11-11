//  the ts of vite config file
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_APP_MOCK_API: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_FTP_API: string
  readonly VITE_APP_FTP_STATIC_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
