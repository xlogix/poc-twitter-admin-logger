var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDefined, IsNotEmpty, IsString, ValidateNested, IsEnum, IsArray, } from 'class-validator';
import { prop, getModelForClass, index } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import Permission from './permission.model';
import { RoleStatus } from 'common/constants';
let Role = class Role {
};
__decorate([
    prop({ required: true, unique: true }),
    IsDefined({ groups: ['create'], message: 'EMPTY_NAME' }),
    IsNotEmpty({ always: true, message: 'INVALID_NAME' }),
    IsString({ always: true, message: 'INVALID_NAME' }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    prop({ required: true }),
    IsDefined({ groups: ['create'], message: 'EMPTY_PERMISSIONS' }),
    IsArray({ always: true, message: 'INVALID_PERMISSIONS' }),
    ValidateNested({ always: true, each: true }),
    Type(() => Permission),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
__decorate([
    prop({ default: RoleStatus.ACTIVE }),
    IsEnum(RoleStatus, { always: true, message: 'INVALID_STATUS' }),
    __metadata("design:type", Number)
], Role.prototype, "status", void 0);
Role = __decorate([
    index({ name: 1 }, { unique: true })
], Role);
const RoleModel = getModelForClass(Role, {
    schemaOptions: {
        id: false,
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});
export { Role, RoleModel, Permission };
//# sourceMappingURL=role.model.js.map