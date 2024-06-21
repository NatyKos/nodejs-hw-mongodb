import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import router from './routers/contacts.js';
import { HttpError } from 'http-errors';

const PORT = Number(env('PORT', '3000'));

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
};

const setupServer = () => {
  const logger = pino({ transport: { target: 'pino-pretty' } });
  const app = express();
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
