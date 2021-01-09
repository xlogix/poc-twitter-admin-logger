import { Log } from 'interfaces/log.interface';
import * as mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    actor: {
        type: String,
        require: true
    },
    action: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
});

const LogModel = mongoose.model<Log & mongoose.Document>('User', logSchema);

export default LogModel;