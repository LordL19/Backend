import { model, Schema } from "mongoose";


const UserTypeSchema = new Schema({
    type: {
        type: String,
        enum: ["visitor", "student", "administrator"]
    }
})

export const UserTypeModel = model("user_types", UserTypeSchema);