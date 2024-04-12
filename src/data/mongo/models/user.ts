import { model, Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    last_name: string;
    password: string;
    active: boolean;
    email: string;
    validated_email: boolean;
    created_at: Date;
    updated_at: Date;
    id_campus: Schema.Types.ObjectId;
    type: 'visitor' | 'student' | 'moderator' | 'administrator';
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    validated_email: {
        type: Boolean,
        default: false
    },
    id_campus: {
        type: Schema.Types.ObjectId,
        ref: 'campus',
        required: true
    },
    type: {
        type: String,
        enum: ['visitor', 'student', "moderator", 'administrator'],
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});
UserSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        if (ret.id_campus) {
            ret.id_campus = {
                id: ret.id_campus._id.toString(),
                name: ret.id_campus.name,
            };
        }
    },
});
export const UserModel = model<IUser>('users', UserSchema);


