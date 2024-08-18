/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import { userEntity } from '../entities/User.entity';
import { LogSuccess, LogError } from '../../utils/logger';
import { IUser } from '../interfaces/IUser.interface';
import { IAuth } from '../interfaces/IAuth.interface';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { UserResponse } from '../types/UsersResponse.type';
dotenv.config();

// obtain secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';
/**
 * Method to obtain all Users from Collection
 */
export const getAllUsers = async (page: number, limit: number) => {
  try {
    let userModel = userEntity();

    let response: any = {};
    // Search all user(using pagination)
    await userModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .select('name email age')
      .exec().then((users: IUser[]) => {
        response.users = users;
      });
    // Count total documents in "Users"
    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${ error }`);
  }
}
// - Get user By Id
export const getUserById = async (id: string) : Promise<any | undefined> => {
  try{
    let userModel = userEntity();
    // Search User By Id
    return await userModel.findById(id).select('name email age');
  } catch ( error ) {
    LogError(`[ORM ERROR]: Getting  User By id: ${ error }`);
  }
}

// - Delete User
export const deleteUserById = async (id: string) : Promise<any | undefined> => {
  try{
    let userModel = userEntity();
    // Delete User By Id
    return await userModel.deleteOne({ _id: id});
  } catch ( error ) {
    LogError(`[ORM ERROR]: Deleting  User By id: ${ error }`);
  }
}

// - Create User
export const updateUserById = async (user: any, id: string) : Promise<any | undefined> => {
  try {
    let userModel = userEntity();
    // Update User By Id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await userModel.findByIdAndUpdate(id, user);
  } catch ( error ) {
    LogError(`[ORM ERROR]: updateing  User ${id}: ${ error }`);
  }
}

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    return await userModel.create(user);
  }catch ( error ) {
    LogError(`[ORM ERROR]: Creating User: ${ error }`)
  }
}
// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    let userFound: IUser | undefined = undefined;
    let token = undefined;
    
    // Check if user exists by Email
    await userModel.findOne({ email: auth.email }).then((user: IUser) => {
      userFound = user;
    }).catch((error) => {
      console.error('[ERROR Authentication in ORM]: User Not Found');
      throw new Error(`ERROR Authentication in ORM]: User Not Found:  ${ error }`)
    });

    // Check if password is valid
    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);
    if(!validPassword) {
      console.error('[ERROR Authentication in ORM]: Password not valid');
      throw new Error('ERROR Authentication in ORM]: Password not valid:')
    }
    // create JWT
    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: '2h'
    });
    return {
      user: userFound,
      token: token
    }
  } catch (error) {
    LogError(`[ORM ERROR]: Log in: ${error}`)
  }
}
// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
  
}