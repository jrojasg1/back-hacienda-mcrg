/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import { kataEntity } from '../entities/Kata.entity';
import { LogSuccess, LogError } from '../../utils/logger';
import { IKata } from '../interfaces/IKata.interface';

import dotenv from 'dotenv';
dotenv.config();

/**
 * Method to obtain all Users from Collection
 */
export const getAllKatas = async (page: number, limit: number) => {
  try {
    let kataModel = kataEntity();

    let response: any = {};
    // Search all user(using pagination)
    await kataModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((katas: IKata[]) => {
        response.katas = katas;
      });
    // Count total documents in "Users"
    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Katas: ${ error }`);
  }
}
// - Get user By Id
export const getKataById = async (id: string) : Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Search User By Id
    return await kataModel.findById(id);
  } catch ( error ) {
    LogError(`[ORM ERROR]: Getting  Kata By id: ${ error }`);
  }
}

// - Delete Kata
export const deleteUserById = async (id: string) : Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Delete User By Id
    return await kataModel.deleteOne({ _id: id});
  } catch ( error ) {
    LogError(`[ORM ERROR]: Deleting  Kata By id: ${ error }`);
  }
}

// - Create Kata
export const createKata = async (kata: IKata) : Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Delete User By Id
    return await kataModel.create(kata);
  } catch ( error ) {
    LogError(`[ORM ERROR]: Creating  User: ${ error }`);
  }
}

// - Create Kata
export const updateKataById = async (kata: IKata, id: string) : Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();
    // Update User By Id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await kataModel.findByIdAndUpdate(id, kata);
  } catch ( error ) {
    LogError(`[ORM ERROR]: updateing  Kata ${id}: ${ error }`);
  }
}
