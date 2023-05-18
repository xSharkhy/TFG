import * as mongoose from 'mongoose';

export default interface IComment {
    _id: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
}