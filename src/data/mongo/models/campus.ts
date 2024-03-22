import { model, Schema, Document } from 'mongoose';

interface ICampus extends Document {
    name: string;
    
}
const CampusSchema: Schema = new Schema({
    name: { type: String, required: true },

})

export const CampusModel = model<ICampus>('Campus', CampusSchema);