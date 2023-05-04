import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const user = User.build(req.body);
            await user.save();
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            res.status(201).send(userWithoutPassword);
        } catch (error) {
            res.status(400).send(error);
        }
    }


    async login(req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send('Invalid email or password');
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send('Invalid email or password');
            }

            const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
            res.send({ token });
        } catch (error) {
            res.status(400).send('Invalid email or password');
        }
    }

}

export default new AuthController();
