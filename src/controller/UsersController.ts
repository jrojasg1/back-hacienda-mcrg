/* eslint-disable @typescript-eslint/semi */
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { getAllUsers, getUserById, deleteUserById, createUser, updateUserById } from "../domain/orm/User.orm";
import { BasicResponse } from "./types";
import Response from 'express';

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {

  /**
   * Endpoint to retreive the Users in the Collection "Users" of DB
   * @param {string} id  Id of uder to retreive (optional)
   * @returns All users o user found by ID
   */
  @Get("/")
  public async getUsers (@Query() id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/users] Get User By Id: ${id}`);
      response = await getUserById(id);
    } else {
      LogSuccess('[/api/users] Get all users Request');
      response = await getAllUsers();
    }
    return response;
  }

  /**
   * Endpoint to delete user
   * @param {string} id 
   * @returns message informating if deletion successfully
   */
  @Delete("/")
  public async deleteUser (@Query() id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/users] Get User By Id: ${id}`);
      await deleteUserById(id).then((r) => {
        response = {
          message: `User with id ${id} deleted sucessfully`
        }
      })
    } else {
      LogWarning('[/api/users] Delete user Request WITHOUT Id');
      response = {
        message: 'Pleasem, provide an ID to remove from database'
      }
    }
    return response;
  }

  @Post('/')
  public async createUser(@Query() user:any): Promise<any> {
    let response: any = '';
    await createUser(user).then((r) => {
      LogSuccess(`[/api/users] Create user: ${user}`)
      response = {
        mesage: `User created successfully: ${user.name}`
      }
    })
    return response;
  }

  @Put('/')
  public async updateUser(@Query() user: any, id: string): Promise<any> {
    let response: any = '';
    await updateUserById(user, id).then((r) => {
      LogSuccess(`[/api/users] Update user: ${user}`)
      response = {
        mesage: `User Updated successfully: ${user.name}`
      }
    })
    return response;
  }

}
