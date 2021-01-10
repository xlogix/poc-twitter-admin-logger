import { mongoose } from "@typegoose/typegoose";

export interface Tweet {
    _id: string,
    tweet: string,
    user: mongoose.Types.ObjectId
}