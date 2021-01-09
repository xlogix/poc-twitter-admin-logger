import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/user.dto';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
class AuthRoute {
    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
        this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto), this.authController.logIn);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    }
}
export default AuthRoute;
//# sourceMappingURL=auth.route.js.map