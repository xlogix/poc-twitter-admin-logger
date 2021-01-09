import { Router } from 'express';
import tweetController from '../controllers/tweet.controller';
import { CreateTweetDto } from '../dtos/tweet.dto';
import validationMiddleware from '../middlewares/validation.middleware';
class EventRoute {
    constructor() {
        this.path = '/tweet';
        this.router = Router();
        this.tweetController = new tweetController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.tweetController.getTweets);
        this.router.get(`${this.path}/:id`, this.tweetController.getTweetById);
        this.router.post(`${this.path}`, validationMiddleware(CreateTweetDto), this.tweetController.createTweet);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateTweetDto, true), this.tweetController.updateTweet);
        this.router.delete(`${this.path}/:id`, this.tweetController.deleteTweet);
    }
}
export default EventRoute;
//# sourceMappingURL=tweet.route.js.map