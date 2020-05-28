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
var UserSchema = new mongoose_1.Schema({
    fullName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    address: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    isAdmin: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false
    }
});
exports.default = mongoose_1.default.model("User", UserSchema);
function validateUser(user) {
    var schema = {
        fullName: joi_1.default.string().min(5).max(50).required(),
        address: joi_1.default.string().min(5).max(50).required(),
        password: joi_1.default.string().min(5).max(25).required(),
        email: joi_1.default.string().email().required(),
        isAdmin: joi_1.default.boolean().default(false)
    };
    return joi_1.validate(user, schema);
}
exports.validateUser = validateUser;
