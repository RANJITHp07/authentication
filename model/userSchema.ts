import mongoose, { Schema, Document } from 'mongoose';

// Define interface for User document
export interface User extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String }
});

const UserModel= mongoose.model<User>('User', UserSchema);

export default UserModel;
