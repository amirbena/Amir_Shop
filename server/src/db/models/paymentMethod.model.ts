import mongoose, { Schema, Document } from "mongoose";

import Joi, { validate, string } from "joi";



export interface IPaymentMethod extends Document {
    paymentMethod: string;
}


const PaymentMethodSchema: Schema = new Schema({
    paymentMethod: {
        type: String,
        required: true,
        unique: true
    }
});


export default mongoose.model<IPaymentMethod>("Payments Methods", PaymentMethodSchema);


export function validatePaymentMethod(model: IPaymentMethod) {
    const schema = {
        paymentMethod: Joi.string().required().min(3).max(55)
    }
    return validate(model, schema);
}