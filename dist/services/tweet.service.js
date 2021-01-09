import mongoose from 'mongoose';
import HttpException from '../exceptions/HttpException';
import { isEmptyObject } from '../utils/util';
import LogModel from 'models/log.model';
import TweetModel from '../models/tweet.model';
import UserModel from 'models/user.model';
class TweetsService {
    constructor() {
        this.tweets = TweetModel;
        this.logs = LogModel;
        this.users = UserModel;
    }
    // CRUD
    async findAllTweets(query) {
        const filter = query !== undefined ? query : {};
        const tweets = await this.tweets.find(filter);
        return tweets;
    }
    async findTweetById(tweetId) {
        const findTweet = await this.tweets.findById(tweetId);
        if (!findTweet)
            throw new HttpException(409, "This tweet doesn't exist");
        return findTweet;
    }
    async createTweet(tweetData) {
        // Verify the tweet data
        if (isEmptyObject(tweetData))
            throw new HttpException(400, "Unable to create a tweet");
        const createTweetData = await this.tweets.create(Object.assign({}, tweetData));
        const user = await this.users.findOne({ _id: tweetData.user });
        console.log(user);
        await this.logs.create({ user });
        return createTweetData;
    }
    async updateTweet(tweetId, tweetData) {
        if (isEmptyObject(tweetData))
            throw new HttpException(400, "Send more data...");
        const updateTweetData = await this.tweets.findByIdAndUpdate(tweetId, Object.assign({}, tweetData));
        if (!updateTweetData)
            throw new HttpException(409, "You're not a tweet");
        return updateTweetData;
    }
    async deleteTweetData(tweetId) {
        const updateTweetData = await this.tweets.findByIdAndDelete(tweetId);
        if (!updateTweetData)
            throw new HttpException(409, "You're not a tweet");
        return updateTweetData;
    }
    // Other APIs
    async getTweetFrequency(userId) {
        const tweets = await this.tweets.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userId)
                },
            },
            {
                $group: {
                    _id: null,
                    total_tweets: { $sum: 1 },
                },
            },
        ]);
        return tweets;
    }
}
export default TweetsService;
//# sourceMappingURL=tweet.service.js.map