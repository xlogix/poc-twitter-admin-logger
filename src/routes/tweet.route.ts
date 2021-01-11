import { Router } from 'express';
import tweetMiddleware from '../middlewares/tweet.middleware';
import tweetController from '../controllers/tweet.controller';
import { CreateTweetDto } from '../dtos/tweet.dto';
import Route from '../interfaces/route.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class EventRoute implements Route {
    public path = '/tweet';
    public router = Router();
    public tweetController = new tweetController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, tweetMiddleware, this.tweetController.getTweets);
        this.router.get(`${this.path}/:id`, tweetMiddleware, this.tweetController.getTweetById);
        this.router.post(`${this.path}`, tweetMiddleware, validationMiddleware(CreateTweetDto), this.tweetController.createTweet);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateTweetDto, true), this.tweetController.updateTweet);
        this.router.delete(`${this.path}/:id`, tweetMiddleware, this.tweetController.deleteTweet);
        this.router.get(`${this.path}/insights/freq`, this.tweetController.getTweetFrequency);
    }
}

export default EventRoute;
