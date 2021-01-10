import { mongoose } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/user.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';
import { isEmptyObject } from '../utils/util';

class AuthService {
    public users = UserModel;

    public async signup(userData: CreateUserDto): Promise<User> {
        if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

        const hashedPassword = await bcrypt.hash(userData.password, 10);
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

    public async login(userData: CreateUserDto): Promise<{ cookie: string, findUser: User }> {
        if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await this.users.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `Your email ${userData.email} not found`);

        const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser };
    }

    public async logout(userData: User): Promise<User> {
        if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await this.users.findOne({ password: userData.password });
        if (!findUser) throw new HttpException(409, "You're not user");

        return findUser;
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { _id: user._id };
        const secret: string = process.env.JWT_SECRET;
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: sign(dataStoredInToken, secret, { expiresIn }) };
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthService;
