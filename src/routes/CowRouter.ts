/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import express, { type Request, type Response } from 'express';
import { LogInfo } from '../utils/logger';
// Body Parser to read Body from request
import bodyParser from "body-parser";
// middleware verify JWT
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { CowController } from '../controller/CowController';
import { ICow } from '../domain/interfaces/ICow.interface';

let jsonParser = bodyParser.json();
// Router from express
const cowRouter = express.Router();

// http://localhost:8000/api/cow
cowRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // obtain a Query Param (id)
        // eslint-disable-next-line prefer-const
        let id: any = req?.query?.id;
        // Pagination
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        LogInfo(`Query Param ${id} - ${page} - ${limit}`);
        // Controller Instance to execute
        const controller: CowController = new CowController();
        const response: any = await controller.getCows(page, limit, id);
        // send response
        return res.send(response);
    })
    .delete(verifyToken, async (req: Request, res: Response) => {
        let id: any = req?.query?.id
        LogInfo(`Query Param ${id}`);
        const controller: CowController = new CowController();
        const response: any = await controller.deleteCow(id);
        // Check if the cow was successfully deleted
        return res.status(response.status).send({response});
    })
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {

        let { id } = req.query;
        let { name, description = '', age = 0, milkProduction = 0, births = 0, creator } = req?.body;

        LogInfo(`Query Param ${id}, ${name}, ${description}, ${age}, ${milkProduction}, ${births}`);
        
        if (typeof id !== 'string' || !id) {
            return res.status(400).json({ message: '[ERROR] Missing or invalid "id" parameter.' });
        }

        if (!name || !description || age < 0 || milkProduction < 0 || births < 0 || !creator) {
            return res.status(400).json({
                message: '[ERROR] Missing or invalid parameters to update cow.'
            });
        }

        let cow: ICow = { name, description, age, milkProduction, births, creator };

        try {

            const controller = new CowController();

            const response = await controller.updateCow(id, cow);

            return res.status(response.success ? 200 : 404).json({
                success: response.success,
                message: response.success ? 'Cow updated successfully'
                    : 'Cow not found. You need to send all attrs of cow to update',
                data: response.success ? response : undefined
            });
        } catch (error) {
            // Manejo de errores
            return res.status(500).send({
                message: '[ERROR] Updating Kata.'
            })
        }
    })
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {

        let { name, description = '', age = 0, milkProduction = 0, births = 0, creator }: ICow = req?.body;

        LogInfo(`Query Param ${name}, ${description}, ${age}, ${milkProduction}, ${births}`);

        if (!name || !description || age < 0 || milkProduction < 0 || births < 0 || !creator) {
            return res.status(400).json({
                message: '[ERROR] Missing or invalid parameters to create cow.'
            });
        }

        let cow: ICow = { name, description, age, milkProduction, births, creator };

        try {
            const controller = new CowController();

            const response = await controller.createCow(cow);

            return res.status(response.success ? 200 : 404).send({
                response
            });
        } catch (error) {
            // Manejo de errores
            return res.status(500).send({
                message: '[ERROR] Creating Cow.'
            })
        }

    })

export default cowRouter;
