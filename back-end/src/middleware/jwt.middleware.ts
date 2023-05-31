import { Response, NextFunction } from 'express';
import CustomRequest, { decodeToken } from '../interfaces/types';

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Please authenticate' });
    }

    try {
        const token = authorizationHeader.split(' ')[1];
        req.userId = decodeToken(token);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};
