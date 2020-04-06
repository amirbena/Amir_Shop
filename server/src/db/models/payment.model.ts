import mongoose, { Document, Schema } from "mongoose";
import Joi, { validate } from 'joi';


export interface IPayment extends Document {
    userId: string;
    paymentMethodId: string;
    cartId: string;
    datePaid: Date;
    isDone: boolean;
}

export interface IPaymentValidator {
    userId: string;
    paymentMethodId: string;
    cartId: string;
}

const PaymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethodId: {
        type: Schema.Types.ObjectId,
        ref: "PaymentMethod",
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    isDone: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    datePaid: {
        type: Schema.Types.Date,
        required: false
    }
})

export default mongoose.model<IPayment>("PaymentSchema", PaymentSchema);


export function validatePayment(payment: any) {
    const schema = {
        userId: Joi.string().required(),
        paymentMethodId: Joi.string().required(),
        cartId: Joi.string().required(),
        isDone: Joi.boolean().default(false)
    }
    return validate(payment, schema)
}