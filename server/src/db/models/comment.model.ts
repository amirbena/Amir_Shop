import mongoose, { Document, Schema } from "mongoose";
import Joi, { validate } from "joi";

export interface IComment extends Document {
    user_id: any;
    product_id: any;
    title: string;
    comment: string;
    rank: number;
}
export interface ICommentInput {
    user_id: any;
    product_id: any;
    title: string;
    comment: string;
    rank: number;
}
const CommentSchema: Schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    title: {
        type: Schema.Types.String,
        required: true
    },
    comment: {
        type: Schema.Types.String,
        required: true
    },
    rank: {
        type: Schema.Types.Number,
        required: true,
        min: 0,
        max: 5
    }
})
export default mongoose.model<IComment>("Comment", CommentSchema);

export function validateComment(comment: ICommentInput) {
    const schema = {
        user_id: Joi.required(),
        product_id: Joi.required(),
        title: Joi.string().required().min(3).max(50),
        comment: Joi.string().required().min(20).max(255),
        rank: Joi.number().min(0).max(50)
    }
    return validate(comment, schema);
}