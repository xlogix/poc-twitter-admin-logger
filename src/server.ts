import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import UserRoute from './routes/user.route';
import AuthRoute from './routes/auth.route';
import TweetRoute from './routes/tweet.route';

const app = new App([
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new TweetRoute(),
]);

app.listen();
