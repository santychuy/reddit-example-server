declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string | 4000;
    SECRET_SESSION: string;
  }
}
