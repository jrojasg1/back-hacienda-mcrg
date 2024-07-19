import express, { Express, Request, Response } from 'express';
import cors from 'cors';// Security
import helmet from 'helmet';

// TODO HTTPS

import router from '../routes';


// Crete Express App
const server: Express = express()

// Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:8000/api/...
server.use(
    '/api',
    router);

// TODO Mongoose Connection

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
