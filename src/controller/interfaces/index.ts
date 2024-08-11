/* eslint-disable @typescript-eslint/method-signature-style */
import { type BasicResponse } from '../types'

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from db
  getUsers(id?: string) : Promise<any>
  deleteUser(id?: string) : Promise<any>
  createUser(user: any) : Promise<any>
  updateUser(user: any, id: string) : Promise<any>
}
