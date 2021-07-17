import express from 'express';
/* import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'; */

import { initGraphql } from './graphql';

const app = express();
initGraphql(app);

export default app;
