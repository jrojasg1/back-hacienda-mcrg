/* eslint-disable @typescript-eslint/semi */
/**
 * Root Router - Redirections
 */

import express, { Request, Response} from 'express';
import helloRouter from './HelloRouter';
import { LogInfo } from '../utils/logger';
import usersRouter from './UserRouter';
import authRouter from './AuthRouter';
import katasRouter from './KataRouter';

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
server.use('/', rootRouter);
server.use('/hello', helloRouter); 
server.use('/users', usersRouter); // http://localhost:8000/api/users/ -> userRouter
server.use('/auth', authRouter); // http://localhost:8000/api/auth -> authRouter
server.use('/kata', katasRouter); // http://localhost:8000/api/kata -> kataRouter

export default server;
