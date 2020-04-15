"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logger_1 = __importDefault(require("./startup/logger"));
var ServerApplication = /** @class */ (function () {
    function ServerApplication(port, controllers) {
        this.app = express_1.default();
        this.port = port;
        this.intializeMiddlewares();
        this.intializeControllers(controllers);
    }
    ServerApplication.prototype.intializeMiddlewares = function () {
        this.app.use(body_parser_1.default.json());
    };
    ServerApplication.prototype.intializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use("api" + controller.path, controller.router);
        });
    };
    ServerApplication.prototype.listen = function () {
        var _this = this;
        var server = this.app.listen(this.port, function () {
            logger_1.default.log("info", "App listens to " + _this.port + " PORT");
        });
        return server;
    };
    return ServerApplication;
}());
exports.default = ServerApplication;
