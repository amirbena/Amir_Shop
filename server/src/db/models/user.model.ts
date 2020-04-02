
import mongoose, { Document, Schema } from "mongoose";
import joi, { validate } from "joi";

export interface IUser extends Document {
    fullName: string;
    address: string;
    email: string;
    password: string;
    isAdmin: boolean;
}
const UserSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})
export default mongoose.model<IUser>("User", UserSchema);

export function validateUser(user: IUser) {
    const schema = {
        fullName: joi.string().min(5).max(50).required(),
        address: joi.string().min(5).max(50).required(),
        password: joi.string().min(5).max(25).required(),
        email: joi.string().email().required(),
        isAdmin: joi.boolean().default(false)
    }
    return validate(user, schema);
}
