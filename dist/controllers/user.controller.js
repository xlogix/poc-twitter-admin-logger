import userService from '../services/user.service';
class UsersController {
    constructor() {
        this.userService = new userService();
        this.getUsers = async (req, res, next) => {
            try {
                const findAllUsersData = await this.userService.findAllUser();
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            const userId = req.params.id;
            try {
                const findOneUserData = await this.userService.findUserById(userId);
                res.status(200).json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            const userData = req.body;
            try {
                const createUserData = await this.userService.createUser(userData);
                res.status(201).json({ data: createUserData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            const userId = req.params.id;
            const userData = req.body;
            try {
                const updateUserData = await this.userService.updateUser(userId, userData);
                res.status(200).json({ data: updateUserData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            const userId = req.params.id;
            try {
                const deleteUserData = await this.userService.deleteUserData(userId);
                res.status(200).json({ data: deleteUserData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default UsersController;
//# sourceMappingURL=user.controller.js.map