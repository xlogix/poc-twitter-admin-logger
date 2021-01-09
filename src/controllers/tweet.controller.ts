import moment from 'moment';
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { CreateTweetDto } from '../dtos/tweet.dto';
import tweetService from '../services/tweet.service';
import { Tweet } from '../interfaces/tweet.interface';
import { User } from '../interfaces/user.interface';

class TweetController {
    public tweetService = new tweetService();

    public getTweets = async (req: Request, res: Response, next: NextFunction) => {
        const userId: string = req.params.user;
        const query: any = {};

        if (userId) {
            query.user = mongoose.Types.ObjectId(userId)
        }

        try {
            const findAllTweetsData: Tweet[] = await this.tweetService.findAllTweets(query);
            res.status(200).json({ data: findAllTweetsData, message: 'All Tweets' });
        } catch (error) {
            next(error);
        }
    }

    public getTweetById = async (req: Request, res: Response, next: NextFunction) => {
        const userId: string = req.params.id;

        try {
            const findOneTweetData: Tweet = await this.tweetService.findTweetById(userId);
            res.status(200).json({ data: findOneTweetData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    }

    public createTweet = async (req: Request, res: Response, next: NextFunction) => {
        const tweetData: CreateTweetDto = req.body;

        try {
            const createTweetData: Tweet = await this.tweetService.createTweet(tweetData);
            res.status(201).json({ data: createTweetData, message: 'created' });
        } catch (error) {
            next(error);
        }
    }

    public updateTweet = async (req: Request, res: Response, next: NextFunction) => {
        const tweetId: string = req.params.id;
        const tweetData: Tweet = req.body;

        try {
            const updateTweetData: Tweet = await this.tweetService.updateTweet(tweetId, tweetData);
            res.status(200).json({ data: updateTweetData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    }

    public deleteTweet = async (req: Request, res: Response, next: NextFunction) => {
        const tweetId: string = req.params.id;

        try {
            const deleteTweetData: Tweet = await this.tweetService.deleteTweetData(tweetId);
            res.status(200).json({ data: deleteTweetData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    }

    public getTweetFrequency = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId: any = req.query.user;
        const fromDate: any = req.query.fromDate;
        const toDate: any = req.query.toDate;
        const query: any = {};

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
            const tweetData: Tweet = await this.tweetService.getTweetFrequency(query);
            res.status(200).json({ data: tweetData, message: 'user\'s activity' });
        } catch (error) {
            next(error);
        }
    }
}

export default TweetController;