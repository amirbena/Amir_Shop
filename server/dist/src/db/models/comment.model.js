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
var CommentSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    comment: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    rank: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        min: 0,
        max: 5
    }
});
exports.default = mongoose_1.default.model("Comment", CommentSchema);
function validateComment(comment) {
    var schema = {
        user_id: joi_1.default.required(),
        product_id: joi_1.default.required(),
        title: joi_1.default.string().required().min(3).max(50),
        comment: joi_1.default.string().required().min(20).max(255),
        rank: joi_1.default.number().min(0).max(50)
    };
    return joi_1.validate(comment, schema);
}
exports.validateComment = validateComment;
