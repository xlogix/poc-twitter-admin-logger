import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { IsDefined, MaxLength } from 'class-validator';
import { User } from './user.model';

class Tweet {
    @prop({ default: null })
    @MaxLength(160, { always: true, message: 'MAX_TWEET' })
    public tweet!: string;

    @prop({ ref: User })
    @IsDefined({ message: 'USER_MISSING' })
    public user!: Ref<User>;
}

const TweetModel = getModelForClass(Tweet, {
    schemaOptions: {
        id: false,
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
});

export { Tweet, TweetModel };
