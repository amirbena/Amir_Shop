"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbServices_1 = __importDefault(require("../db/startup/dbServices"));
var http_status_codes_1 = require("http-status-codes");
var admin_middleware_1 = __importDefault(require("./middlewares/admin.middleware"));
var auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
var generalRoute_route_1 = __importDefault(require("./generalRoute.route"));
var UserService = dbServices_1.default.UserService, CartService = dbServices_1.default.CartService;
var UserRoute = /** @class */ (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute() {
        var _this = _super.call(this) || this;
        _this.getUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        if (!users.length)
                            return [2 /*return*/, res.status(http_status_codes_1.NOT_FOUND).send({
                                    status: http_status_codes_1.NOT_FOUND,
                                    details: "<h1> no users into DB</h1>"
                                })];
                        res.send(users);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.addUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserService.createUser(req.body, this.jwtPrivateKey)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details, token = _a.token;
                        if (status !== http_status_codes_1.OK)
                            return [2 /*return*/, res.status(status).send({
                                    details: details, status: status
                                })];
                        if (token) {
                            return [2 /*return*/, res.send({
                                    token: token,
                                    details: details
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.loginUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserService.userLogin(req.body, this.jwtPrivateKey)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details, token = _a.token;
                        if (status !== http_status_codes_1.OK)
                            return [2 /*return*/, res.status(status).send({
                                    details: details,
                                    status: status
                                })];
                        if (token) {
                            return [2 /*return*/, res.send({
                                    token: token,
                                    details: details
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.makeUserAdmin = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserService.makeUserAdmin(req.body.id_will_admin)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        if (status !== http_status_codes_1.OK)
                            return [2 /*return*/, res.status(status).send({
                                    details: details,
                                    status: status
                                })];
                        return [2 /*return*/, res.send({ details: details })];
                }
            });
        }); };
        _this.getUserById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, UserService.getUserById(req.body.id)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        if (status !== http_status_codes_1.OK)
                            return [2 /*return*/, res.status(status).send({
                                    details: details,
                                    status: status
                                })];
                        return [2 /*return*/];
                }
            });
        }); };
        _this.deleteUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, cartStatus, cartDetails, _b, status, details;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.body.user.id;
                        return [4 /*yield*/, CartService.deleteAllCartAccordingUser(id)];
                    case 1:
                        _a = _c.sent(), cartStatus = _a.status, cartDetails = _a.details;
                        if (cartStatus !== http_status_codes_1.OK) {
                            return [2 /*return*/, res.status(cartStatus).send({
                                    status: cartStatus,
                                    details: cartDetails
                                })];
                        }
                        return [4 /*yield*/, UserService.deleteUser(id)];
                    case 2:
                        _b = _c.sent(), status = _b.status, details = _b.details;
                        if (status !== http_status_codes_1.OK)
                            return [2 /*return*/, res.status(status).send({
                                    details: details,
                                    status: status
                                })];
                        return [2 /*return*/, res.send({ details: details })];
                }
            });
        }); };
        _this.jwtPrivateKey = process.env.jwtPrivateKey;
        _this.path = "/users";
        _this.intiailzeRoutes();
        return _this;
    }
    UserRoute.prototype.intiailzeRoutes = function () {
        this.router.get(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.getUsers);
        this.router.post(this.path + "/new_user", this.addUser);
        this.router.get(this.path + "/login", this.loginUser);
        this.router.put(this.path + "/admin", [auth_middleware_1.default, admin_middleware_1.default], this.makeUserAdmin);
        this.router.get(this.path + "/user", this.getUserById);
        this.router.delete(this.path, [admin_middleware_1.default]);
    };
    return UserRoute;
}(generalRoute_route_1.default));
exports.default = UserRoute;
