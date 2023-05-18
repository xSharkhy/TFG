import { Response, NextFunction } from 'express';
import CustomRequest, { decodeToken } from '../interfaces/types';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = (req.header('Authorization') as string).replace('Bearer ', '');
        const decodedUserId = decodeToken(token);
        req.userId = decodedUserId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};
