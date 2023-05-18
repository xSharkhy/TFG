export default interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    birthday: Date;
    comparePassword(password: string): Promise<boolean>;
}