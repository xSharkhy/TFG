import BlogPost from '../models/post.model';
import { Request, Response } from 'express';

export const getAllBlogPosts = async (req: Request, res: Response) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'username');
        res.status(200).json(blogPosts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getBlogPostById = async (req: Request, res: Response) => {
    try {
        const blogPost = await BlogPost.findById(req.params.postId).populate('author', 'username');
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createBlogPost = async (req: Request, res: Response) => {
    try {
        const blogPost = new BlogPost({ ...req.body, author: req.userId });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    try {
        const blogPost = await BlogPost.findByIdAndUpdate(req.params.postId, req.body, { new: true });
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.postId);
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
