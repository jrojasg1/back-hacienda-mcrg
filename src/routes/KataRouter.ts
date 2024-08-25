/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import express, { type Request, type Response } from 'express';
import { UserController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';
// Body Parser to read Body from request
import bodyParser from "body-parser";
// middleware verify JWT
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { KatasController } from '../controller/KatasController';
import { IKata, KataLevel } from '../domain/interfaces/IKata.interface';

let jsonParser = bodyParser.json();
// Router from express
const katasRouter = express.Router();

// http://localhost:8000/api/users/?id=78595ijufdjfdfmvk7884
katasRouter.route('/')
  .get(verifyToken, async (req: Request, res: Response) => {
    // obtain a Query Param (id)
    // eslint-disable-next-line prefer-const
    let id: any = req?.query?.id;
    // Pagination
    let page: any = req?.query?.page || 1;
    let limit: any = req?.query?.limit || 10;

    LogInfo(`Query Param ${id} - ${page} - ${limit}`);
    // Controller Instance to execute
    const controller: KatasController = new KatasController();
    const response: any = await controller.getKatas(page, limit, id);
    // send response
    return res.send(response);
  })
  .delete(verifyToken, async (req: Request, res: Response) => {
    let id: any = req?.query?.id
    LogInfo(`Query Param ${id}`);
    const controller: KatasController = new KatasController();
    const response: any = await controller.deleteKata(id);
    return res.status(200).send(response);
  })
  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    let id: string = req?.query?.id

    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.starts || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution;
    let participants: strinh[] = req?.body?.participants || [];

    LogInfo(`Query Param ${id}, ${name}, ${description}, ${level}, ${intents}, ${stars}`);

    if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
      let kata: IKata = {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants
      };

      const controller: KatasController = new KatasController();
      const response: any = await controller.updateKata(id, kata);
      return res.status(200).send(response);
    }else{
      return res.status(400).send({
        message: '[ERROR] Updating Kata. You need to send all attrs of kata to update'
      })
    }

  })
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {

    let name: string = req?.body?.name;
    let description: string = req?.body?.description || '';
    let level: KataLevel = req?.body?.level || KataLevel.BASIC;
    let intents: number = req?.body?.intents || 0;
    let stars: number = req?.body?.stars || 0;
    let creator: string = req?.body?.creator;
    let solution: string = req?.body?.solution;
    let participants: strinh[] = req?.body?.participants || [];

    LogInfo(`Query Param ${name}, ${description}, ${level}, ${intents}, ${stars}`);

    if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
      let kata: IKata = {
        name: name,
        description: description,
        level: level,
        intents: intents,
        stars: stars,
        creator: creator,
        solution: solution,
        participants: participants
      };

      const controller: KatasController = new KatasController();
      const response: any = await controller.createKata(kata);
      return res.status(201).send(response);
    }else{
      return res.status(400).send({
        message: '[ERROR] Creating Kata'
      })
    }

  })

export default katasRouter;
