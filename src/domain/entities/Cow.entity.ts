import mongoose from "mongoose";
import { ICow } from "../interfaces/ICow.interface";

export const CowEntity = () => {

  let CowSchema = new mongoose.Schema<ICow>(
    {
      name: {type: String, required: true },
      description: {type: String, required: true },
      age:{type: Number, required: true },
      milkProduction: {type: Number, required: true }, 
      births: {type: Number, required: true },
      creator: {type: String, required: true },  // Id of User
    }
  );

  return mongoose.models.Cow || mongoose.model<ICow>('Cow', CowSchema);
}