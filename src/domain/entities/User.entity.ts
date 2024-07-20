/* eslint-disable @typescript-eslint/semi */
import mongoose from 'mongoose';

export const userEntity = () => {

  let userSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      age: Number

    }
  )

  return mongoose.model('Users', userSchema);
  
}
