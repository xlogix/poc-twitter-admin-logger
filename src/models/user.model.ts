import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator';
import { Role } from './role.model';

class User {
    @prop()
    @MinLength(1, { always: true, message: 'INVALID_FIRST_NAME' })
    @MaxLength(30, { always: true, message: 'INVALID_FIRST_NAME' })
    public firstName!: string;

    @prop()
    @MinLength(1, { always: true, message: 'INVALID_FIRST_NAME' })
    @MaxLength(30, { always: true, message: 'INVALID_LAST_NAME' })
    public lastName!: string;

    @prop({ required: true, unique: true, lowercase: true })
    @IsDefined({ message: 'EMPTY_EMAIL' })
    @IsEmail({}, { always: true, message: 'INVALID_EMAIL' })
    public email!: string;

    @prop({ default: null })
    @IsDefined({ message: 'EMPTY_PASSWORD' })
    public password!: string;

    @prop({ required: true, ref: Role, default: process.env.DEFAULT_USER_ROLE_ID })
    @IsDefined({ message: 'ROLE_MISSING' })
    public role!: Ref<Role>;
}

const UserModel = getModelForClass(User, {
    schemaOptions: {
        id: false,
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});

export { User, UserModel };
