import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import router from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const logger = pino({ transport: { target: 'pino-pretty' } });
  const app = express();
  app.use(express.json());
  app.use(logger);
  app.use(cors());
  app.use(router);
  app.use(errorHandler);
  app.use('*', notFoundHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
