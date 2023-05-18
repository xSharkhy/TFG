import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import ForumThread from '../models/thread.model';
import IComment from '../interfaces/comment.interface';

export const getAllForumThreads = async (req: Request, res: Response) => {
    try {
        const forumThreads = await ForumThread.find().populate('author', 'username');
        res.status(200).json(forumThreads);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getForumThreadById = async (req: Request, res: Response) => {
    try {
        const forumThread = await ForumThread.findById(req.params.threadId).populate('author', 'username');
        if (!forumThread) {
            return res.status(404).json({ error: 'Forum thread not found' });
        }
        res.status(200).json(forumThread);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createForumThread = async (req: Request, res: Response) => {
    try {
        const forumThread = new ForumThread({ ...req.body, author: req.userId });
        await forumThread.save();
        res.status(201).json(forumThread);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateForumThread = async (req: Request, res: Response) => {
    try {
        const forumThread = await ForumThread.findByIdAndUpdate(req.params.threadId, req.body, { new: true });
        if (!forumThread) {
            return res.status(404).json({ error: 'Forum thread not found' });
        }
        res.status(200).json(forumThread);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteForumThread = async (req: Request, res: Response) => {
    try {
        const forumThread = await ForumThread.findByIdAndDelete(req.params.threadId);
        if (!forumThread) {
            return res.status(404).json({ error: 'Forum thread not found' });
        }
        res.status(200).json({ message: 'Forum thread deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const addComment = async (req: Request, res: Response) => {
    try {
        const forumThread = await ForumThread.findById(req.params.threadId);
        if (!forumThread) {
            return res.status(404).json({ error: 'Forum thread not found' });
        }
        const comment: IComment = {
            _id: new mongoose.Types.ObjectId(),
            author: new mongoose.Types.ObjectId(req.userId as string),
            content: req.body.text,
            createdAt: new Date(),
        };
        forumThread.comments.push(comment);
        await forumThread.save();
        res.status(201).json(forumThread);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};



export const deleteComment = async (req: Request, res: Response) => {
    try {
        const forumThread = await ForumThread.findById(req.params.threadId);
        if (!forumThread) {
            return res.status(404).json({ error: 'Forum thread not found' });
        }
        const commentsArray: Types.DocumentArray<IComment> = forumThread.comments as Types.DocumentArray<IComment>;
        const comment = commentsArray.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        commentsArray.pull(comment);
        await forumThread.save();
        res.status(200).json(forumThread);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};