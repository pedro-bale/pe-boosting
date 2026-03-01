/// <reference types="vite/client" />

declare module "vue" {
  export function ref<T>(value: T): { value: T };
  export function computed<T>(getter: () => T): { readonly value: T };
  export function watch(
    source: any,
    cb: (...args: any[]) => void,
    options?: any
  ): void;
}

declare module "vue-router" {
  export function createRouter(options: any): any;
  export function createWebHistory(base?: string): any;
}

interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

