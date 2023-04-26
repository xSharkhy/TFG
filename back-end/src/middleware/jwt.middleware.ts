import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedUser {
	_id: string;
}

export const jwtMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return res.status(401).send('Access denied. No token provided.');
	}

	try {
		const decoded = jwt.verify(token, 'your_jwt_secret') as DecodedUser;
		req.user = { _id: decoded._id };
		next();
	} catch (error) {
		res.status(400).send('Invalid token.');
	}
};
