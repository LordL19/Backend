import { model, Schema, Document } from 'mongoose';

interface IUser extends Document {

    name:string;
    last_name: string;
    password: string;
    active: boolean;
    email: string;
    validated_email: boolean;
    created_at : Date;
    updated_at : Date;
    id_campus: Schema.Types.ObjectId;
    type: 'visitor' | 'student' | 'administrator';
    
       
}

const UserSchema = new Schema ({
    name: { type: String, required: true},
    last_name: { type: String, required: true},
    password: { type: String, required: true, select: false },
    active: {type: Boolean, default: true},
    email: { type: String, required: true, unique: true},
    validated_email: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now},
    updated_at: { type: Date, default: Date.now},
    id_campus: { type: Schema.Types.ObjectId, ref: 'Campus'},
    type: {
        type: String,
        enum: ['visitor', 'student', 'administrator'],
        required: true
    }
});

const UserModel = model<IUser>('User', UserSchema);
export default UserModel

