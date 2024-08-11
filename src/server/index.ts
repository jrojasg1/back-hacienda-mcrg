/* eslint-disable @typescript-eslint/semi */
import express, { Express, Request, Response } from 'express';
import cors from 'cors';// Security
import helmet from 'helmet';

// Swagger
import swaggerUi from 'swagger-ui-express';

// TODO HTTPS

import router from '../routes';
import mongoose from 'mongoose';

// Crete Express App
const server: Express = express()

// * Swagger Config and route
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true
    }
  })
)
// Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:8000/api/...
server.use(
  '/api',
  router);

// Static server
server.use(express.static('public'));

// TODO Mongoose Connection
mongoose.connect('mongodb://localhost:27017/haciendamcgr');

// Security Config
server.use(helmet());
server.use(cors());

// Content Type:
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));

// Redirection Config
// http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response)=>{
  res.redirect('/api');
});

export default server;
