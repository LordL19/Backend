import { model, Schema } from 'mongoose';

const SectionTypeSchema: Schema = new Schema({
  name: { type: String, required: true },
  id_user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { strict: false });

export const SectionTypeModel = model('SectionType', SectionTypeSchema);

