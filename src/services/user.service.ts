import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/user.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { isEmptyObject } from '../utils/util';

class UserService {
    public users = UserModel;

    public async findAllUser(): Promise<User[]> {
        const users: User[] = await this.users.find();
        return users;
    }

    public async findUserById(userId: string): Promise<User> {
        const findUser: User = await this.users.findById(userId);
        if (!findUser) throw new HttpException(409, "You're not user");

        return findUser;
    }

    public async createUser(userData: CreateUserDto): Promise<User> {
        if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

        const hashedPassword = bcrypt.hash(userData.password, 10);

        // Assign a role
        if (String(userData.role) === 'User') {
            userData.role = mongoose.Types.ObjectId(process.env.DEFAULT_USER_ROLE_ID);
        } else if (String(userData.role) === 'Admin') {
            userData.role = mongoose.Types.ObjectId(process.env.DEFAULT_ADMIN_ROLE_ID);
        } else if (String(userData.role) === 'SuperAdmin') {
            userData.role = mongoose.Types.ObjectId(process.env.DEFAULT_SUPERADMIN_ROLE_ID);
        }
        const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
        return createUserData;
    }

    public async updateUser(userId: string, userData: User): Promise<User> {
        if (isEmptyObject(userData)) throw new HttpException(400, "Empty data");

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const updateUserById: User = await this.users.findByIdAndUpdate(userId, { ...userData, password: hashedPassword });
        if (!updateUserById) throw new HttpException(409, "Update failed! Try agian");

        return updateUserById;
    }

    public async deleteUserData(userId: string): Promise<User> {
        const deleteUserById: User = await this.users.findByIdAndDelete(userId);
        if (!deleteUserById) throw new HttpException(409, "Unable to delete user");

        return deleteUserById;
    }
}

export default UserService;
