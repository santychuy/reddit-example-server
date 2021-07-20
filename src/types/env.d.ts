declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    NAME_SESSION: string;
    SECRET_SESSION: string;
  }
}
