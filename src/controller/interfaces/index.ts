/* eslint-disable @typescript-eslint/method-signature-style */
import {  BasicResponse } from '../types';
import { IUser } from '../domain/interfaces/IUser.interface';

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from db
  getUsers(id?: string) : Promise<any>
  deleteUser(id?: string) : Promise<any>
  updateUser(user: any, id: string) : Promise<any>
}

export interface IAuthController {
  registerUser(user: IUser): Promise<any>
  // login user
  loginUser(auth: any): Promise<any>
}