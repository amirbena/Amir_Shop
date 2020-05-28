"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbServices_1 = __importDefault(require("./startup/dbServices"));
var dbconnection_1 = __importDefault(require("./startup/dbconnection"));
var connection = dbconnection_1.default();
exports.default = {
    Services: dbServices_1.default,
    connection: connection
};
