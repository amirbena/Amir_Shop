"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var HTTP_Enum_1 = __importDefault(require("../../common/HTTP_Enum"));
var BAD_REQUEST = HTTP_Enum_1.default.BAD_REQUEST, UNAUTHORIZED = HTTP_Enum_1.default.UNAUTHORIZED;
function default_1(req, res, next) {
    var token = req.header('x-auth-token');
    if (!token)
        return res.status(UNAUTHORIZED).send('Access denied. No token provided.');
    try {
        var jwtPrivateKey = process.env.jwtPrivateKey;
        var decoded = jsonwebtoken_1.default.verify(token, jwtPrivateKey);
        req.body.user = decoded;
        next();
    }
    catch (ex) {
        res.send(BAD_REQUEST).send("Invalid token");
    }
}
exports.default = default_1;
