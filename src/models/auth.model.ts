import { getModelForClass, post } from '@typegoose/typegoose';

class Session {
  public _id!: string;
  public expires!: Date;
  public session!: string;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    id: false,
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
});

export { Session, SessionModel };