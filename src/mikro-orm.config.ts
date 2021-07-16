import { MikroORM } from '@mikro-orm/core';
import path from 'path';

export default {
  dbName: 'redditexample',
  type: 'postgresql',
  debug: process.env.NODE_ENV === 'development',
  entities: ['./dist/entities/**/*.js'],
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0];
