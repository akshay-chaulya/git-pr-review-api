import mongoose, { Schema, Document } from 'mongoose';


interface IUser extends Document {
    userId: string;
    accessToken: string;
}


const UserSchema: Schema<IUser> = new Schema({
    userId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true }
});


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
