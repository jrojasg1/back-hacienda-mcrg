/* eslint-disable @typescript-eslint/consistent-type-imports */
import {  Request,  Response,  NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// config to read env  variables
dotenv.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';
/**
 * 
 * @param { Request } req Original request previous middleware of verifitcation JWT
 * @param { Response } res Rsponse Verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Erros of verification or next excution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check HEADER from request for 'x-access-token'
  let token: any = req.headers['x-access-token']

  // verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authenticationError: 'Failed to verify JWT',
      message: 'Not authorized to consume this endpoint'
    })
  }
  // verify the token obtained.
  jwt.verify(token, secret,(err: any, decode: any) => {
    if(err){
      return res.status(500).send({
        authenticationError: 'Failed to verify JWT',
        message: 'Failed to verify JWT token'
      })
    }
    // Pass something

    // Execute next function -> Proctected Routes 
    next();
  })

}
