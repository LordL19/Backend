import { model, Schema } from 'mongoose';

const SectionSchema: Schema = new Schema({
  section_type: {
    type: Schema.Types.ObjectId,
    ref: 'section_types',
    required: true
  },
  date: {
    type: Object,
    required: true
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  id_campus: {
    type: Schema.Types.ObjectId,
    ref: 'campus',
    required: true
  }
}, { strict: false });
SectionSchema.index({ section_type: 1 });

export const SectionModel = model('sections', SectionSchema);

