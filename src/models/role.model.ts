import {
    IsDefined,
    IsNotEmpty,
    IsString,
    ValidateNested,
    IsArray,
} from 'class-validator';
import { prop, getModelForClass, index } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import Permission from './permission.model';

@index({ name: 1 }, { unique: true })
class Role {
    @prop({ required: true, unique: true })
    @IsDefined({ groups: ['create'], message: 'EMPTY_NAME' })
    @IsNotEmpty({ always: true, message: 'INVALID_NAME' })
    @IsString({ always: true, message: 'INVALID_NAME' })
    public name!: string;

    @prop({ required: true })
    @IsDefined({ groups: ['create'], message: 'EMPTY_PERMISSIONS' })
    @IsArray({ always: true, message: 'INVALID_PERMISSIONS' })
    @ValidateNested({ always: true, each: true })
    @Type(() => Permission)
    public permissions!: Permission[];

    @prop({ default: 1 })
    public status?: number;
}

const RoleModel = getModelForClass(Role, {
    schemaOptions: {
        id: false,
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});

export { Role, RoleModel, Permission };
