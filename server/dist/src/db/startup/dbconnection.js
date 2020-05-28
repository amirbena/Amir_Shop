"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = __importDefault(require("../../startup/logger"));
var config_1 = __importDefault(require("config"));
function default_1() {
    var absoultePath = config_1.default.get("DB_PATH");
    logger_1.default.info(absoultePath);
    var connection = mongoose_1.default.connect(absoultePath, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    connection.then(function () { return logger_1.default.info("Connected to " + absoultePath + " in " + process.env.NODE_ENV + " enviroment"); })
        .catch(function (ex) { return logger_1.default.error("Can't connect  " + ex.message); });
    return connection;
}
exports.default = default_1;
