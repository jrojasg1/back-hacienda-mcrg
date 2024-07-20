/* eslint-disable @typescript-eslint/semi */
import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '@/utils/logger';

// CRUD

/**
 * Method to obtain all Users from Collection
 */
export const GetAllUsers = async () => {
  try {
    let UserModel = userEntity();
    return await UserModel.find({ isDelete: false });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${ error }`);
  }
}

// TODO
// - Get user By Id
// - Create User