import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import { CreateUserDto } from '../dtos/user.dto';
import validationMiddleware from '../middlewares/validation.middleware';
class UsersRoute {
    constructor() {
        this.path = '/user';
        this.router = Router();
        this.usersController = new UsersController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.usersController.createUser);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
    }
}
export default UsersRoute;
//# sourceMappingURL=user.route.js.map