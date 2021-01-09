import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import UserModel from '../models/user.model';
import { isEmptyObject } from '../utils/util';
class UserService {
    constructor() {
        this.users = UserModel;
    }
    async findAllUser() {
        const users = await this.users.find();
        return users;
    }
    async findUserById(userId) {
        const findUser = await this.users.findById(userId);
        if (!findUser)
            throw new HttpException(409, "You're not user");
        return findUser;
    }
    async createUser(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "You're not userData");
        const findUser = await this.users.findOne({ email: userData.email });
        if (findUser)
            throw new HttpException(409, `You're email ${userData.email} already exists`);
        const hashedPassword = bcrypt.hash(userData.password, 10);
        // Assign a role
        if (String(userData.role) === 'User') {
            userData.role = mongoose.Types.ObjectId(process.env.DEFAULT_USER_ROLE_ID);
        }
        else if (String(userData.role) === 'Admin') {
            userData.role = mongoose.Types.ObjectId(process.env.DEFAULT_ADMIN_ROLE_ID);
        }
        else if (String(userData.role) === 'SuperAdmin') {
            userData.role = mongoose.Types.ObjectId(process.env.DEFAULT_SUPERADMIN_ROLE_ID);
        }
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (isEmptyObject(userData))
            throw new HttpException(400, "Empty data");
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const updateUserById = await this.users.findByIdAndUpdate(userId, Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        if (!updateUserById)
            throw new HttpException(409, "Update failed! Try agian");
        return updateUserById;
    }
    async deleteUserData(userId) {
        const deleteUserById = await this.users.findByIdAndDelete(userId);
        if (!deleteUserById)
            throw new HttpException(409, "Unable to delete user");
        return deleteUserById;
    }
}
export default UserService;
//# sourceMappingURL=user.service.js.map