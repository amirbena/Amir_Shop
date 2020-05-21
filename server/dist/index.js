"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbconnection_1 = __importDefault(require("./db/startup/dbconnection"));
var app_1 = __importDefault(require("./app"));
var logger_1 = __importDefault(require("./startup/logger"));
var intialzeRoutes_1 = __importDefault(require("./startup/intialzeRoutes"));
var config_1 = __importDefault(require("config"));
var server;
dbconnection_1.default().then(function (result) {
    var PORT = config_1.default.get("PORT") || 5000;
    server = new app_1.default(PORT, intialzeRoutes_1.default()); /* Need to change it */
    server.app.get("/", function (request, response) {
        response.send('<h1>Amir shop Application</h1>');
    });
    server = server.listen();
}).catch(function (err) { return logger_1.default.log("error", err.message); });
exports.default = server;
