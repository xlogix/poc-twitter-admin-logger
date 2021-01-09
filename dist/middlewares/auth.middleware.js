import { verify } from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import userModel from '../models/user.model';
async function authMiddleware(req, res, next) {
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = verify(cookies.Authorization, secret);
            const userId = verificationResponse._id;
            const findUser = await userModel.findById(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        }
        catch (error) {
            next(new HttpException(401, 'Wrong authentication token'));
        }
    }
    else {
        next(new HttpException(404, 'Authentication token missing'));
    }
}
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map