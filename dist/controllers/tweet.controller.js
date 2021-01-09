import moment from 'moment';
import mongoose from 'mongoose';
import tweetService from '../services/tweet.service';
class TweetController {
    constructor() {
        this.tweetService = new tweetService();
        this.getTweets = async (req, res, next) => {
            const userId = req.params.user;
            const query = {};
            if (userId) {
                query.user = mongoose.Types.ObjectId(userId);
            }
            try {
                const findAllTweetsData = await this.tweetService.findAllTweets(query);
                res.status(200).json({ data: findAllTweetsData, message: 'All Tweets' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTweetById = async (req, res, next) => {
            const userId = req.params.id;
            try {
                const findOneTweetData = await this.tweetService.findTweetById(userId);
                res.status(200).json({ data: findOneTweetData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createTweet = async (req, res, next) => {
            const tweetData = req.body;
            try {
                const createTweetData = await this.tweetService.createTweet(tweetData);
                res.status(201).json({ data: createTweetData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTweet = async (req, res, next) => {
            const tweetId = req.params.id;
            const tweetData = req.body;
            try {
                const updateTweetData = await this.tweetService.updateTweet(tweetId, tweetData);
                res.status(200).json({ data: updateTweetData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteTweet = async (req, res, next) => {
            const tweetId = req.params.id;
            try {
                const deleteTweetData = await this.tweetService.deleteTweetData(tweetId);
                res.status(200).json({ data: deleteTweetData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTweetFrequency = async (req, res, next) => {
            const userId = req.query.user;
            const fromDate = req.query.fromDate;
            const toDate = req.query.toDate;
            const query = {};
            if (userId) {
                query.user = mongoose.Types.ObjectId(userId);
            }
            if (fromDate) {
                query.startDate = {
                    $gte: moment(fromDate).utc().toDate(),
                    $lte: moment(toDate).utc().toDate(),
                };
            }
            try {
                const tweetData = await this.tweetService.getTweetFrequency(query);
                res.status(200).json({ data: tweetData, message: 'user\'s activity' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default TweetController;
//# sourceMappingURL=tweet.controller.js.map