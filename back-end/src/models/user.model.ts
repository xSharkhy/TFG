import mongoose, { Schema } from 'mongoose';
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

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err: any) {
        return next(err);
    }
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);