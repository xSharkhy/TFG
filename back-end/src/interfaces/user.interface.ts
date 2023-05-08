export default interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}