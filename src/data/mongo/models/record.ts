import { model, Schema } from 'mongoose';

const RecordSchema: Schema = new Schema({
  data: {
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
  },
  id_section: {
    type: Schema.Types.ObjectId,
    ref: 'sections',
    required: true
  }
});
RecordSchema.index({ id_section: 1 });

export const RecordModel = model('records', RecordSchema);

