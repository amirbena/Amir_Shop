import mongoose, { Document, Schema } from "mongoose";
import Joi, { validate } from "joi";

export interface IProduct extends Document {
    category_id: any;
    admin_id: any;
    price_for_each: number;
    name: string;
    amount: number;
    image_url: string;
}
export interface IProductInput {
    category_id: any;
    admin_id: any;
    name: string;
    price_for_each: number;
    amount: number;
    image_url: string;
}

const ProductSchema: Schema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    price_for_each: {
        type: Schema.Types.Number,
        required: true,
        min: 0.5
    },
    amount: {
        type: Schema.Types.Number,
        required: true,
        min: 1
    },
    image_url: {
        type: String,
        required: true
    }
})
export default mongoose.model<IProduct>("Product", ProductSchema);

export function validateProduct(product: IProductInput) {
    const schema = {
        admin_id: Joi.required(),
        category_id: Joi.required(),
        name: Joi.string().required().min(5).max(50),
        price_for_each: Joi.number().min(0.5).max(1000000),
        amount: Joi.number().min(1),
        image_url: Joi.string().required().min(20)
    }
    return validate(product, schema);
}