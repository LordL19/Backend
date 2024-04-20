import { model, Schema } from 'mongoose';

const SectionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  active: {
    type: Boolean,
    default: true
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
  }],
  moderators: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
});

export const SectionModel = model('sections', SectionSchema);

