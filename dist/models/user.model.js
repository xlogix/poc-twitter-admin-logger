import * as mongoose from 'mongoose';
import { Role } from './role.model';
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        ref: Role,
        default: process.env.DEFAULT_USER_ROLE_ID
    }
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
//# sourceMappingURL=user.model.js.map