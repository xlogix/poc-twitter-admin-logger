import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import errorMiddleware from './middlewares/error.middleware';
class App {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV === 'production' ? true : false;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 App listening on the port ${this.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        if (this.env) {
            this.app.use(hpp());
            this.app.use(logger('combined'));
            this.app.use(cors({ origin: 'localhost:3000', credentials: true }));
        }
        else {
            this.app.use(logger('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        // required for passport
        // this.app.use({ secret: 'randomized string', resave: true, saveUninitialized: true });
        // this.app.use(passport.initialize());
        // this.app.use(passport.session());
        // this.app.use(flash());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
    connectToDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE } = process.env;
        const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${MONGO_DATABASE}?authSource=admin`, Object.assign({}, options));
    }
}
export default App;
//# sourceMappingURL=app.js.map