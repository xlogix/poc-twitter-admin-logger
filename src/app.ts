import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import Routes from './interfaces/route.interface';
import errorMiddleware from './middlewares/error.middleware';

class App {
    public app: express.Application;
    public port: (string | number);
    public env: boolean;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV === 'production' ? true : false;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 App listening on the port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        if (this.env) {
            this.app.use(hpp());
            this.app.use(logger('combined'));
            this.app.use(cors({ origin: 'localhost:3000', credentials: true }));
        } else {
            this.app.use(logger('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        // // required for passport
        // this.app.use({ secret: 'randomizedstring', resave: true, saveUninitialized: true });
        // this.app.use(passport.initialize());
        // this.app.use(passport.session());
        // this.app.use(flash());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private connectToDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE } = process.env;
        const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${MONGO_DATABASE}?authSource=admin`, { ...options });
    }
}

export default App;
