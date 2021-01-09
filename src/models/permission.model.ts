import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

class Permission {
    @IsDefined({ groups: ['create', 'update'], message: 'EMPTY_RESOURCE' })
    @IsNotEmpty({ groups: ['create', 'update'], message: 'INVALID_RESOURCE' })
    @IsString({ groups: ['create', 'update'], message: 'INVALID_RESOURCE' })
    public resource!: string;

    @IsDefined({ groups: ['create', 'update'], message: 'EMPTY_ACTION' })
    @IsNotEmpty({ groups: ['create', 'update'], message: 'INVALID_ACTION' })
    @IsString({ groups: ['create', 'update'], message: 'INVALID_ACTION' })
    public action!: string;

    @IsDefined({ groups: ['create', 'update'], message: 'EMPTY_ATTRIBUTES' })
    @IsNotEmpty({ groups: ['create', 'update'], message: 'INVALID_ATTRIBUTES' })
    @IsString({ groups: ['create', 'update'], message: 'INVALID_ATTRIBUTES' })
    public attributes!: string;
}

export default Permission;
