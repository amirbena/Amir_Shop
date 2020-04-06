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
var CategorySchema = new mongoose_1.Schema({
    category_name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true
    }
});
exports.default = mongoose_1.default.model("Category", CategorySchema);
function validateCategory(category) {
    var schema = {
        category_name: joi_1.default.string().required().min(3).max(50)
    };
    return joi_1.validate(category, schema);
}
exports.validateCategory = validateCategory;
