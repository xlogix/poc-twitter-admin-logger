import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { UserModel } from '../models/user.model';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken } from '../interfaces/auth.interface';

async function tweetMiddleware(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    console.log('cookie2: ' + JSON.stringify(cookies));

    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;

        try {
            const verificationResponse = verify(cookies.Authorization, secret) as DataStoredInToken;
            const userId = verificationResponse._id;
            // Get the user ID from previous midleware
            const findUser = await UserModel.findById(userId);

            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } catch (error) {
            next(new HttpException(401, 'Wrong authentication token'));
        }
    } else {
        next(new HttpException(404, 'Authentication token missing'));
    }
}

export default tweetMiddleware;