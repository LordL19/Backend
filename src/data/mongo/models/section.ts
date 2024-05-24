import { Schema, model } from "mongoose";

const SectionSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	id_parent: {
		type: Schema.Types.ObjectId,
		ref: "sections",
		default: null,
	},
	id_user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	active: {
		type: Boolean,
		default: true,
	},
	public: {
		type: Boolean,
		required: true
	},
	fields: [
		{
			name: {
				type: String,
				required: true,
			},
			type: {
				type: String,
				enum: ["text", "number", "date", "datetime", "time", "checkbox"],
				required: true,
			},
		},
	],
	moderators: [
		{
			type: Schema.Types.ObjectId,
			ref: "users",
		},
	],
});

export const SectionModel = model("sections", SectionSchema);
