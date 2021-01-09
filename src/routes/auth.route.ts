import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/user.dto';
import Route from '../interfaces/route.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
    public path = '/auth';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
        this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto), this.authController.logIn);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    }
}

export default AuthRoute;
