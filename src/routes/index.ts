/**
 * Root Router - Redirections
 */

import express, { Request, Response} from 'express';
import helloRouter from './HelloRouter';
import { LogInfo } from '../utils/logger';

//server instance
let server = express();

//Rputer instance
let rootRouter = express.Router();

//GET: http://localhost:8000/api/
server.get('/',(req:Request, res:Response) => {
    LogInfo('GET: http://localhost:8000/api/');
    res.send("welcome");
});

//manage router & controllers
server.use('/',rootRouter);
server.use('/hello',helloRouter); 

export default server;
