import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/user.interface';


const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    } as (err: any, hash: string) => void);
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);