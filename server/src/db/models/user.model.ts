
import mongoose, { Document, Schema } from "mongoose";
import joi, { validate } from "joi";

export interface IUser extends Document {
    fullName: string;
    address: string;
    email: string;
    password: string;
    isAdmin: boolean;
}
export interface IUserInput{
    fullName: string;
    address: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}
export interface ILogin {
    email: string;
    password: string;
}
const UserSchema: Schema = new Schema({
    fullName: {
        type: Schema.Types.String,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    isAdmin: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    }
})
export default mongoose.model<IUser>("User", UserSchema);

export function validateUser(user: IUserInput) {
    const schema = {
        fullName: joi.string().min(5).max(50).required(),
        address: joi.string().min(5).max(50).required(),
        password: joi.string().min(5).max(25).required(),
        email: joi.string().email().required(),
        isAdmin: joi.boolean().default(false)
    }
    return validate(user, schema);
}
