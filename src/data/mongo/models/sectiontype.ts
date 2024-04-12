import { model, Schema } from 'mongoose';

const SectionTypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fields: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["text", "number", "date"],
      required: true
    }
  }]
}, { strict: false });

export const SectionTypeModel = model('section_types', SectionTypeSchema);

