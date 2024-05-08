import { type Document, Schema, model } from "mongoose";

interface ICampus extends Document {
	name: string;
}

const CampusSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

export const CampusModel = model<ICampus>("campus", CampusSchema);
