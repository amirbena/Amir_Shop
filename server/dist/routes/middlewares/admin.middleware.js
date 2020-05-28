"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
function default_1(req, res, next) {
    if (!req.body.user.isAdmin)
        return res.status(http_status_codes_1.FORBIDDEN).send("Access denied");
    next();
}
exports.default = default_1;
