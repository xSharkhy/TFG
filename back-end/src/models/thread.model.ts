import mongoose, { Schema, Document } from 'mongoose';

interface Comment {
    _id: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
}

interface ForumThreadDocument extends Document {
    title: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    comments: Comment[];
}

const forumThreadSchema: Schema<ForumThreadDocument> = new Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

export default mongoose.model<ForumThreadDocument>('ForumThread', forumThreadSchema);
