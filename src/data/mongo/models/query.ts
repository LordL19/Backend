import { Schema, model } from "mongoose";

const QuerySchema: Schema = new Schema({
    id_section: {
        type: Schema.Types.ObjectId,
        ref: "sections",
    },
    data: {
        type: Object,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const QueryModel = model("queries", QuerySchema);
