/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { LogInfo } from '../utils/logger'
// BCRYPT for passwords
import bcrypt from 'bcrypt';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';
// Body Parser
import bodyParser from 'body-parser';
import { rmSync } from 'fs';
// Middleware to read JSON in body
let jsonParser = bodyParser.json();
// router from express
let authRouter = express.Router();

authRouter.route('/register')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { name, email, password, age } = req?.body;
    let hashedPassword = '';
    if(name && password && email && age) {
      hashedPassword = bcrypt.hashSync(password, 8);
      let newUser: IUser = {
        name: name,
        email: email,
        password: hashedPassword,
        age: age
      }
      const controller: AuthController = new AuthController();
    
      const response: any = await controller.registerUser(newUser);
      return res.status(200).send(response);
    }
  })

authRouter.route('/login')
  .post(jsonParser, async (req: Request, res: Response) => {
    let { email, password } = req?.body;
    let hashedPassword = '';
    if(password && email) {
      const controller: AuthController = new AuthController();

      let auth: IAuth = {
        email: email,
        password: password
      }

      const response: any = await controller.loginUser(auth);
      return res.status(200).send(response);
    } else {
      // send to the response to client
      return res.status(200).send({
        message: '[ERROR User Data missing]: No user can be registered'
      });
    }
  });

  // Route Protected by VERIFY TOKEN MIDDLEWARE
  authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    let id: any = req?.query?.id;

    if(id) {
      const controller: AuthController = new AuthController();

      let response: any = await controller.userData(id);
      return res.status(200).send(response);
    }else{
      return res.status(401).send({
        message: 'Unauthorized for to perfom this action'
      });
    }
  })

  export default authRouter;