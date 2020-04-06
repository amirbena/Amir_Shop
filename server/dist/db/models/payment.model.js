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
var PaymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethodId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PaymentMethod",
        required: true
    },
    cartId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    isDone: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false
    },
    datePaid: {
        type: mongoose_1.Schema.Types.Date,
        required: false
    }
});
exports.default = mongoose_1.default.model("PaymentSchema", PaymentSchema);
function validatePayment(payment) {
    var schema = {
        userId: joi_1.default.string().required(),
        paymentMethodId: joi_1.default.string().required(),
        cartId: joi_1.default.string().required(),
        isDone: joi_1.default.boolean().default(false)
    };
    return joi_1.validate(payment, schema);
}
exports.validatePayment = validatePayment;
