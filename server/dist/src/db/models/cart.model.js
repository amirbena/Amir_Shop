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
var CartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: mongoose_1.Schema.Types.Array,
        required: true,
        default: []
    },
    date: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        default: Date.now()
    },
    sum: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        default: 0
    }
});
exports.default = mongoose_1.default.model("Cart", CartSchema);
function validateCart(model) {
    var schema = {
        userId: joi_1.default.string().required(),
        product: joi_1.default.object().required(),
        date: joi_1.default.date().default(Date.now()),
    };
    return joi_1.validate(model, schema);
}
exports.validateCart = validateCart;
