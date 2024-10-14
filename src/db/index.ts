import mongoose from "mongoose";
import { dbUrl } from "../config";
import User from '../models/user.model';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbUrl);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connection to MongoDB: ", error);
        process.exit(1);
    }
};

export const storeToken = async (userId: string, accessToken: string): Promise<void> => {
    try {
        await User.updateOne(
            { userId },
            { $set: { accessToken } },
            { upsert: true }
        );
    } catch (error) {
        console.error('Error storing access token:', error);
    }
};

export const getToken = async (userId: string): Promise<string | null> => {
    try {
        const user = await User.findOne({ userId });
        return user ? user.accessToken : null;
    } catch (error) {
        console.error('Error retrieving access token:', error);
        return null;
    }
};
