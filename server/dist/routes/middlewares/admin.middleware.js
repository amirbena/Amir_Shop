"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var HTTP_Enum_1 = __importDefault(require("../../common/HTTP_Enum"));
var FORBIDDEN = HTTP_Enum_1.default.FORBIDDEN;
function default_1(req, res, next) {
    if (!req.body.user.isAdmin)
        return res.status(FORBIDDEN).send("Access denied");
    next();
}
exports.default = default_1;
