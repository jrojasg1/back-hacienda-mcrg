/* eslint-disable @typescript-eslint/method-signature-style */
import {  BasicResponse } from '../types';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IKata } from '../domain/interfaces/IKata.interface';

export interface IHelloController {
  getMessage: (name?: string) => Promise<BasicResponse>
}

export interface IUserController {
  // Read all users from db
  getUsers(page: number, limit: number, id?: string) : Promise<any>
  deleteUser(id?: string) : Promise<any>
  updateUser(user: any, id: string) : Promise<any>
}

export interface IAuthController {
  registerUser(user: IUser): Promise<any>
  // login user
  loginUser(auth: any): Promise<any>
}

export interface IKataController {
  // Read all users from db
  getKatas(page: number, limit: number, id?: string) : Promise<any>
  createKata(kata: IKata): Promise<any>
  deleteKata(id?: string) : Promise<any>
  updateKata(kata: IKata, id: string) : Promise<any>
  
}