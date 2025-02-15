import mongoose, { Schema, model } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
    _id?:string;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


export default interface User {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isverified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/.+\@.+\..+/, "please use valid email addres"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required"],
    },
    isverified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

export const UserModel = mongoose.models.User ||  model<User>('User', UserSchema);