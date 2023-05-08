
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ email: user.email }, 'shhhhh');

        res.status(201).json({ user: user._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

export const login = async (req: Request, res: Response) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user || !user.comparePassword(password)) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ email: user.email }, 'shhhhh');

        res.status(200).json({ user: user._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};
