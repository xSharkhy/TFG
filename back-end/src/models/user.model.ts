import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user.interface';

export interface UserDocument extends IUser, Document { }
interface UserModel extends Model<UserDocument> {
	build(attrs: IUser): UserDocument;
}

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.statics.build = (attrs: IUser) => {
	return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
export default User;