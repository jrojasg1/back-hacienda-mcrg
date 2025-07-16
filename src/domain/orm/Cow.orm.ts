/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
import { CowEntity } from '../entities/Cow.entity';
import { LogSuccess, LogError } from '../../utils/logger';
import { ICow } from '../interfaces/ICow.interface';

import dotenv from 'dotenv';
dotenv.config();

/**
 * Method to obtain all Kata from Collection
 */
export const getAllCows = async (page: number, limit: number) => {
  try {
    let cowModel = CowEntity();

    let response: any = {};
    // Search all cow(using pagination)
    await cowModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec().then((cows: ICow[]) => {
        response.katas = cows;
      });
    // Count total documents in "Cows"
    await cowModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Cows: ${ error }`);
  }
}
// - Get Cow By Id
export const getCowById = async (id: string) : Promise<any | undefined> => {
  try {
    let cowModel = CowEntity();
    // Search Cow By Id
    return await cowModel.findById(id);
  } catch ( error ) {
    LogError(`[ORM ERROR]: Getting  Cow By id: ${ error }`);
  }
}

// - Delete Cow
export const deleteCowById = async (id: string) : Promise<any | undefined> => {
  try {
    let cowModel = CowEntity();
    return await cowModel.deleteOne({ _id: id});
  } catch ( error ) {
    LogError(`[ORM ERROR]: Deleting  cow By id: ${ error }`);
  }
}

// - Create Cow
export const createCow = async (cow: ICow) : Promise<any | undefined> => {
  try {
    let cowModel = CowEntity();
    // Delete User By Id
    return await cowModel.create(cow);
  } catch ( error ) {
    LogError(`[ORM ERROR]: Creating  cow: ${ error }`);
  }
}

// - Update Cow
export const updateCowById = async (cow: ICow, id: string) : Promise<any | undefined> => {
  try {
    let cowModel = CowEntity();
    // Update Cow By Id
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await cowModel.findByIdAndUpdate(id, cow);
  } catch ( error ) {
    LogError(`[ORM ERROR]: updateing  cow ${id}: ${ error }`);
  }
}
