"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var joi_1 = __importStar(require("joi"));
var ProductSchema = new mongoose_1.Schema({
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    admin_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price_for_each: {
        type: Number,
        required: true,
        min: 0.5
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    image_url: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model("Product", ProductSchema);
function validateProduct(product) {
    var schema = {
        admin_id: joi_1.default.required(),
        category_id: joi_1.default.required(),
        price_for_each: joi_1.default.number().min(0.5).max(1000),
        amount: joi_1.default.number().min(1),
        image_url: joi_1.default.string().required()
    };
    return joi_1.validate(product, schema);
}
exports.validateProduct = validateProduct;
