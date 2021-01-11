import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import { Strategy as JWTStrategy } from 'passport-jwt';
import Routes from './interfaces/route.interface';
import errorMiddleware from './middlewares/error.middleware';
import { UserModel } from './models/user.model';

class App {
    public app: express.Application;
    public port: (string | number);
    public users = UserModel;
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

    private async initializeMiddlewares() {
        if (this.env) {
            this.app.use(hpp());
            this.app.use(logger('combined'));
            this.app.use(cors({ origin: 'localhost:3000', credentials: true }));
        } else {
            this.app.use(logger('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        // required for passport
        // passport.use(await this.strategy());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    protected async strategy(): Promise<JWTStrategy> {
        return new JWTStrategy(
            {
                jwtFromRequest: (req): any =>
                    String(req.headers.authorization).split(' ')[1],
                secretOrKey: process.env.JWT_SECRET,
            },
            (jwtPayload, done): any => {
                return this.users
                    .findOne(
                        { email: jwtPayload.email },
                        'email role',
                        'role name permissions',
                    )
                    .then((user: any): any => {
                        if (!user) {
                            throw new Error('AUTH_TOKEN_INVALID');
                        }
                        const payload = jwtPayload;
                        payload.user = user;
                        if (user.role) {
                            const { role } = user;
                            payload.access = role.permissions;
                        }
                        return done(null, payload);

                    })
                    .catch((error: any): any => {
                        return done(error);
                    });
            },
        );
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
