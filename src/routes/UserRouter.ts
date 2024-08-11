/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import express, { type Request, type Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// Router from express
const usersRouter = express.Router()

// http://localhost:8000/api/users/?id=78595ijufdjfdfmvk7884
usersRouter.route('/')
  .get(async (req: Request, res: Response) => {
    // obtain a Query Param (id)
    // eslint-disable-next-line prefer-const
    let id: any = req?.query?.id
    LogInfo(`Query Param ${id}`); 
    // Controller Instance to execute
    const controller: UserController = new UserController();
    const response: any = await controller.getUsers(id);
    // send response
    return res.send(response);
  })
  .delete(async (req: Request, res: Response) => {
    let id: any = req?.query?.id
    LogInfo(`Query Param ${id}`); 
    const controller: UserController = new UserController();
    const response: any = await controller.deleteUser(id);
    return res.send(response);
  })
  .post(async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    let age: any = req?.query?.age;
    let email: any = req?.query?.email;

    let user = {
      name: name || 'deafault',
      email: email || 'deafault email',
      age: age || 18
    };

    const controller: UserController = new UserController();
    const response: any = await controller.createUser(user);
    return res.send(response);
  })
  .put(async (req: Request, res: Response) => {
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
    return res.send(response);
  })


export default usersRouter;
