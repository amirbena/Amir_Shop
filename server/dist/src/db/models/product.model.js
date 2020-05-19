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
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    price_for_each: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        min: 0.5
    },
    amount: {
        type: mongoose_1.Schema.Types.Number,
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
        name: joi_1.default.string().required().min(5).max(50),
        price_for_each: joi_1.default.number().min(0.5).max(1000000),
        amount: joi_1.default.number().min(1),
        image_url: joi_1.default.string().required().min(20)
    };
    return joi_1.validate(product, schema);
}
exports.validateProduct = validateProduct;
