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
var PaymentMethodSchema = new mongoose_1.Schema({
    paymentMethod: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true
    }
});
exports.default = mongoose_1.default.model("Payments_Methods", PaymentMethodSchema);
function validatePaymentMethod(model) {
    var schema = {
        paymentMethod: joi_1.default.string().required().min(3).max(55)
    };
    return joi_1.validate(model, schema);
}
exports.validatePaymentMethod = validatePaymentMethod;
