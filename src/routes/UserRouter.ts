/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import express, { type Request, type Response } from 'express';
import { UserController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';
// Body Parser to read Body from request
import bodyParser from "body-parser";
// middleware verify JWT
import { verifyToken } from '../middlewares/verifyToken.middleware';

let jsonParser = bodyParser.json();
// Router from express
const usersRouter = express.Router();

// http://localhost:8000/api/users/?id=78595ijufdjfdfmvk7884
usersRouter.route('/')
  .get(verifyToken, async (req: Request, res: Response) => {
    // obtain a Query Param (id)
    // eslint-disable-next-line prefer-const
    let id: any = req?.query?.id;
    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param ${id}`); 
    // Controller Instance to execute
    const controller: UserController = new UserController();
    const response: any = await controller.getUsers(page, limit, id);
    // send response
    return res.send(response);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    let id: any = req?.query?.id
    LogInfo(`Query Param ${id}`); 
    const controller: UserController = new UserController();
    const response: any = await controller.deleteUser(id);
    return res.status(200).send(response);
  })
  .put(verifyToken, async (req: Request, res: Response) => {
    let id: string = req?.query?.id
    

    let name: any = req?.query?.name;
    let age: any = req?.query?.age;
    let email: any = req?.query?.email;
    LogInfo(`Query Param ${id}, ${name}, ${email}, ${age}`); 
    let user = {
      name: name,
      email: email,
      age: age 
    };

    const controller: UserController = new UserController();
    const response: any = await controller.updateUser(user, id);
    return res.status(200).send(response);
  })

  // http://localhost:8000/api/users/katas?id=0000000
usersRouter.route('/katas')
  .get(verifyToken, async (req: Request, res: Response) => {
    // obtain a Query Param (id)
    // eslint-disable-next-line prefer-const
    let id: any = req?.query?.id;
    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param ${id}`); 
    // Controller Instance to execute
    const controller: UserController = new UserController();
    const response: any = await controller.getKatas(page, limit, id);
    // send response
    return res.send(response);
  })

export default usersRouter;
