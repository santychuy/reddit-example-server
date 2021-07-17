import 'reflect-metadata';

import './config';
import app from './app';

(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`>> Server on: http://localhost:${process.env.PORT}`);
  });
})();
