import { mongoose } from "@typegoose/typegoose";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: mongoose.Types.ObjectId,
    createdAt: Date,
    modifiedAt: Date
}
