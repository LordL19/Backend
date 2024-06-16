import { PreMiddlewareFunction, Schema, model } from "mongoose";

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
	visibility: {
		type: String,
		enum: ["all", "students", "administration"],
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
				enum: ["text", "number", "date", "datetime", "time", "checkbox", "file", "url"],
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

const handlePopulate: PreMiddlewareFunction = function (this, next) {
	this.populate({ path: "moderators", select: ["name", "last_name", "email", "image_url"] })
	next();
}

SectionSchema.pre(/^find/, handlePopulate)

export const SectionModel = model("sections", SectionSchema);
