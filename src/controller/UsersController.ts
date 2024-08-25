/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable @typescript-eslint/semi */
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { getAllUsers, getUserById, deleteUserById, updateUserById, getKatasFromUSer } from "../domain/orm/User.orm";




@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
  
  /**
   * Endpoint to retreive the Users in the Collection "Users" of DB
   * @param {string} id  Id of uder to retreive (optional)
   * @returns All users o user found by ID
  */
 @Get("/")
  public async getUsers (@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
    let response: any = '';
    if (id) {
      LogSuccess(`[/api/users] Get User By Id: ${id}`);
      response = await getUserById(id);
    } else {
      LogSuccess('[/api/users] Get all users Request');
      response = await getAllUsers(page, limit);
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
          status: 204,
          message: `User with id ${id} deleted sucessfully`
        }
      })
    } else {
      LogWarning('[/api/users] Delete user Request WITHOUT Id');
      response = {
        status: 400,
        message: 'Pleasem, provide an ID to remove from database'
      }
    }
    return response;
  }
  
  @Put('/')
  public async updateUser(@Query() user: any, id: string): Promise<any> {
    let response: any = '';
    if (id){
      await updateUserById(user, id).then((r) => {
        LogSuccess(`[/api/users] Update user: ${user}`)
        response = {
          status: 204,
          mesage: `User Updated successfully: ${user.name}`
        }
      })
    } else {
      LogWarning('[/api/users] Update user Request WITHOUT Id');
      response = {
        status: 400,
        message: 'Pleasem, provide an ID to remove from database'
      }
    }
    
    return response;
  }

  @Get('/katas')// users/katas/
  public async getKatas(@Query() page: number, limit: number, id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Get Katas from User by Id: ${id}`);
      response = await getKatasFromUSer(page, limit, id);
    } else {
      LogSuccess('[/api/users] Get Katas without id');
      response = {
        message: 'ID from user is needed'
      }
    }

    return response;
  };
  
}
