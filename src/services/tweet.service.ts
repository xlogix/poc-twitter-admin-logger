import mongoose from 'mongoose';
import HttpException from '../exceptions/HttpException';
import { isEmptyObject } from '../utils/util';
import { CreateTweetDto } from 'dtos/tweet.dto';
import { Tweet } from '../interfaces/tweet.interface';
import LogModel from '../models/log.model';
import { UserModel } from '../models/user.model';
import { TweetModel } from '../models/tweet.model';

class TweetsService {
    public tweets = TweetModel;
    public logs = LogModel;
    public users = UserModel;

    // CRUD
    public async findAllTweets(query?: any): Promise<Tweet[]> {
        const filter = query !== undefined ? query : {};
        const tweets: Tweet[] = await this.tweets.find(filter);
        return tweets;
    }

    public async findTweetById(tweetId: string): Promise<Tweet> {
        const findTweet: Tweet = await this.tweets.findById(tweetId);
        if (!findTweet) throw new HttpException(409, "This tweet doesn't exist");

        return findTweet;
    }

    public async createTweet(tweetData: CreateTweetDto): Promise<Tweet> {
        // Verify the tweet data
        if (isEmptyObject(tweetData))
            throw new HttpException(400, "Unable to create a tweet");

        const createTweetData: Tweet = await this.tweets.create({ ...tweetData });

        const user = await this.users.findOne({ _id: tweetData.user });
        console.log(user);
        await this.logs.create({ user });

        return createTweetData;
    }

    public async updateTweet(tweetId: string, tweetData: Tweet): Promise<Tweet> {
        if (isEmptyObject(tweetData)) throw new HttpException(400, "Send more data...");

        const updateTweetData: Tweet = await this.tweets.findByIdAndUpdate(tweetId, { ...tweetData });
        if (!updateTweetData) throw new HttpException(409, "You're not a tweet");

        return updateTweetData;
    }

    public async deleteTweetData(tweetId: string): Promise<Tweet> {
        const updateTweetData: Tweet = await this.tweets.findByIdAndDelete(tweetId);
        if (!updateTweetData) throw new HttpException(409, "You're not a tweet");

        return updateTweetData;
    }

    // Other APIs
    public async getTweetFrequency(userId: string): Promise<any> {
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