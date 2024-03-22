import { model, Schema } from 'mongoose';

const SectionSchema: Schema = new Schema({
  section_type: { type: Schema.Types.ObjectId, ref: 'SectionType', required: true },
  id_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_campus: { type: Schema.Types.ObjectId, ref: 'Campus', required: true }
}, { strict: false });


export const SectionModel = model('Section', SectionSchema);

