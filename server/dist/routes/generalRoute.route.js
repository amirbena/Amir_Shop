"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var GeneralRoute = /** @class */ (function () {
    function GeneralRoute() {
        this.router = express_1.Router();
        this.path = "";
    }
    return GeneralRoute;
}());
exports.default = GeneralRoute;
