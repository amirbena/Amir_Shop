"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbconnection_1 = __importDefault(require("./db/startup/dbconnection"));
var app_1 = __importDefault(require("./app"));
var logger_1 = __importDefault(require("./startup/logger"));
var server;
dbconnection_1.default().then(function (result) {
    server = new app_1.default(5000, []); /* Need to change it */
    server.app.get("/", function (request, response) {
        response.send('<h1>Amir shop Application</h1>');
    });
    server.listen();
}).catch(function (err) { return logger_1.default.log("error", err.message); });
exports.default = server;
