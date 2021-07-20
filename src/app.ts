import express from 'express';
import redis from 'redis';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { initGraphql } from './graphql';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
    name: process.env.NAME_SESSION,
    saveUninitialized: false,
    secret: process.env.SECRET_SESSION,
    resave: false,
  })
);

initGraphql(app);

export default app;
