import { Response, NextFunction } from 'express';
import CustomRequest, { decodeToken } from '../interfaces/types';

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        console.log('Authorization header:', req.header('Authorization'));
        const token = (req.header('Authorization') as string).replace('Bearer ', '');
        console.log('Token:', token);
        const decodedUserId = decodeToken(token);
        req.userId = decodedUserId;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Please authenticate' });
    }
};
