import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    userId?: string;
}

export const decodeToken = (token: string): string => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
};

export default CustomRequest;
