import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { IsDefined, IsEmail } from 'class-validator';
import { Role } from './role.model';

class User {
    @prop({ required: true, unique: true, lowercase: true })
    @IsDefined({ groups: ['auth', 'create'], message: 'EMPTY_EMAIL' })
    @IsEmail({}, { always: true, message: 'INVALID_EMAIL' })
    public email!: string;

    @prop({ default: null })
    @IsDefined({ groups: ['auth'], message: 'EMPTY_PASSWORD' })
    public password!: string;

    @prop({ ref: Role })
    @IsDefined({ groups: ['create'], message: 'ROLE_MISSING' })
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
