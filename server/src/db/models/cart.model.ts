import mongoose, { Document, Schema } from "mongoose";

import Joi, { validate } from "joi";

export interface ICartDetails {
    productId: string;
    amountBuying: number;
}
export interface ICart extends Document {
    userId: string;
    products: ICartDetails[];
    date: Date;
    sum: number;
}
export interface ICartValidator {
    userId: string;
    product: ICartDetails;
    date?: Date;
}
const CartSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: Schema.Types.Array,
        required: true,
        default: []
    },
    date: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now()
    },
    sum: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    }
})
export default mongoose.model<ICart>("Cart", CartSchema);

export function validateCart(model: ICartValidator) {
    const schema = {
        userId: Joi.string().required(),
        product: Joi.object().required(),
        date: Joi.date().default(Date.now()),
    }
    return validate(model, schema);
}
