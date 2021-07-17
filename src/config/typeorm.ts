import { createConnection } from 'typeorm';

export const connectionTypeorm = async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'redditexample',
    synchronize: true,
    logging: process.env.NODE_ENV === 'development',
    entities: ['dist/entities/**/*.js'],
    migrations: ['dist/migrations/**/*.js'],
  });

  return connection;
};
