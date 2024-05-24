import { Schema, model } from "mongoose";

const RecordSchema: Schema = new Schema(
	{
		data: {
			type: Object,
			required: true,
		},
		public: {
			type: Boolean,
			required: true
		},
		created_by: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		updated_by: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		id_campus: {
			type: Schema.Types.ObjectId,
			ref: "campus",
			required: true,
		},
		id_section: {
			type: Schema.Types.ObjectId,
			ref: "sections",
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	},
);
RecordSchema.index({ id_section: 1 });

// RecordSchema.pre("save", function (next) {
// 	this.created_by = ;
// 	next();
// });
export const RecordModel = model("records", RecordSchema);
