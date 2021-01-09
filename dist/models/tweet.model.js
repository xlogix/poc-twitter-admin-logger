import * as mongoose from 'mongoose';
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
const TweetModel = mongoose.model('Tweet', tweetSchema);
export default TweetModel;
//# sourceMappingURL=tweet.model.js.map