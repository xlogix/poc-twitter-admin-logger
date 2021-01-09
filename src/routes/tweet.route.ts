import { Router } from 'express';
import tweetController from '../controllers/tweet.controller';
import { CreateTweetDto } from '../dtos/tweet.dto';
import Route from '../interfaces/route.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class EventRoute implements Route {
    public path = '/tweet';
    public router = Router();
    public tweetController = new tweetController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.tweetController.getTweets);
        this.router.get(`${this.path}/:id`, this.tweetController.getTweetById);
        this.router.post(`${this.path}`, validationMiddleware(CreateTweetDto), this.tweetController.createTweet);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateTweetDto, true), this.tweetController.updateTweet);
        this.router.delete(`${this.path}/:id`, this.tweetController.deleteTweet);
    }
}

export default EventRoute;
