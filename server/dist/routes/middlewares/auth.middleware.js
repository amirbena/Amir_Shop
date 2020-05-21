"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var http_status_codes_1 = require("http-status-codes");
function default_1(req, res, next) {
    var token = req.header('x-auth-token');
    if (!token)
        return res.status(http_status_codes_1.UNAUTHORIZED).send('Access denied. No token provided.');
    try {
        var jwtPrivateKey = process.env.jwtPrivateKey;
        var decoded = jsonwebtoken_1.default.verify(token, jwtPrivateKey);
        req.body.user = decoded;
        next();
    }
    catch (ex) {
        res.send(http_status_codes_1.BAD_REQUEST).send("Invalid token");
    }
}
exports.default = default_1;
