/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '../../utils/logger';

// CRUD

/**
 * Method to obtain all Users from Collection
 */
export const getAllUsers = async () => {
  try {
    let userModel = userEntity();
    return await userModel.find();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${ error }`);
  }
}
// - Get user By Id
export const getUserById = async (id: string) : Promise<any | undefined> => {

  try{
    let userModel = userEntity();
    // Search User By Id
    return await userModel.findById(id);
  } catch ( error ){
    LogError(`[ORM ERROR]: Getting  User By id: ${ error }`);
  }
}

// - Delete User
export const deleteUserById = async (id: string) : Promise<any | undefined> => {

  try{
    let userModel = userEntity();
    // Delete User By Id
    return await userModel.deleteOne({ _id: id});
  } catch ( error ){
    LogError(`[ORM ERROR]: Deleting  User By id: ${ error }`);
  }
}

// - Create User
export const createUser = async (user: any) : Promise<any | undefined> => {

  try {
    let userModel = userEntity();
    // Delete User By Id
    return await userModel.create(user);
  } catch ( error ) {
    LogError(`[ORM ERROR]: Creating  User: ${ error }`);
  }
}

// - Create User
export const updateUserById = async (user: any, id: string) : Promise<any | undefined> => {

  try {
    let userModel = userEntity();
    // Delete User By Id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await userModel.findByIdAndUpdate(id, user);
  } catch ( error ) {
    LogError(`[ORM ERROR]: updateing  User ${id}: ${ error }`);
  }
}

// TODO

// - Create User