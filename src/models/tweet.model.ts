import { Max } from 'class-validator';
import * as mongoose from 'mongoose';
import { Tweet } from '../interfaces/tweet.interface';

const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        require: true
    },
    user: {
        ref: 'User',
        default: process.env.DEFAULT_USER_ROLE_ID
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
});

const TweetModel = mongoose.model<Tweet & mongoose.Document>('Tweet', tweetSchema);

export default TweetModel;
