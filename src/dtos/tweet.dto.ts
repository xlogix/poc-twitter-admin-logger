import { IsString, IsDate, IsArray } from 'class-validator';

export class CreateTweetDto {

    @IsString()
    public tweet: string;

    @IsString()
    public user: string;

    @IsString()
    public tags: string;
}
