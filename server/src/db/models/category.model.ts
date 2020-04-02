import mongoose, { Document, Schema } from "mongoose";
import Joi, { validate } from "joi";

export interface ICategory extends Document {
    category_name: string;
}

const CategorySchema: Schema = new Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model<ICategory>("Category", CategorySchema);

export function validateCategory(category:ICategory) {
    const schema = {
        category_name: Joi.string().required().min(3).max(50)
    }
    return validate(category, schema);
}