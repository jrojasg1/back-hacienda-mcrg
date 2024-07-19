import express, { type Request, type Response } from 'express'
import { HelloController } from '../controller/HelloController'
import { LogInfo } from '../utils/logger'

// Router from express
const helloRouter = express.Router()

// http://localhost:8000/api/hello/
helloRouter.route('/')
  .get(async (req: Request, res: Response) => {
    // obtain a Query Param
    const name: any = req?.query?.name
    LogInfo(`Query Param ${name}`)
    // Controller Instance to execute
    const controller: HelloController = new HelloController()
    const response = await controller.getMessage(name)
    // send response
    return res.send(response)
  })

export default helloRouter
