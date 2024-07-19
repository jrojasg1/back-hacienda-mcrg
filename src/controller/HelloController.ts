import { BasicResponse } from './types'
import { type IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

export class HelloController implements IHelloController {

    public async getMessage(name?: string): Promise<BasicResponse> {
        LogSuccess('[api/hello] Get Request');
        return{
            message: `Hi ${name || "bby"}`
        }
    }
    
}
