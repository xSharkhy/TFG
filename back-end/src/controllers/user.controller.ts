import User from '../models/user.model';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    const { username, birthday, email, password } = req.body;
    try {
        const user = new User({ username, birthday, email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET! as string, { expiresIn: '7d' });
        res.status(201).json({ message: 'User registered successfully', user: user._id, role: user.role, token: token });
    } catch (error: any) {
        console.error(error);
        if (error.code === 11000) {
            res.status(409).send('Email or username already exists');
        } else {
            res.status(500).send('Error creating user');
        }
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET! as string, { expiresIn: '7d' });
        if (user.role === 'admin') {
            res.status(200).json({ token, userId: user._id, role: user.role });
        } else {
            res.status(200).json({ token, userId: user._id });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
