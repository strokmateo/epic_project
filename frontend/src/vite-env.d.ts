/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOCAL_URL: string;
    readonly VITE_LOCAL_URL_PORT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
