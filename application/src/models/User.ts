// models/User.ts

import { Schema, model, models } from "mongoose";

interface IUser {
    email: string;
    username: string;
    hashedPassword: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            unique: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = models.Users || model('Users', UserSchema);
export default User;