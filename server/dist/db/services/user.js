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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var joi_1 = __importStar(require("joi"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = __importStar(require("../models/user.model"));
var http_status_codes_1 = require("http-status-codes");
var generalService_1 = __importDefault(require("./generalService"));
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.createUser = function (user, jwtKey) {
        return __awaiter(this, void 0, void 0, function () {
            var status, token, details, error, foundUser, salt, _a, createdUser, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        token = '';
                        details = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        error = user_model_1.validateUser(user).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, user_model_1.default.findOne({ email: user.email })];
                    case 2:
                        foundUser = _b.sent();
                        if (foundUser) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("User isn't found into DB");
                        }
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 3:
                        salt = _b.sent();
                        _a = user;
                        return [4 /*yield*/, bcrypt_1.default.hash(user.password, salt)];
                    case 4:
                        _a.password = _b.sent();
                        return [4 /*yield*/, user_model_1.default.create(user)];
                    case 5:
                        createdUser = _b.sent();
                        if (createdUser) {
                            status = http_status_codes_1.OK;
                            details = createdUser.toJSON();
                            token = this.generateAuthToken(createdUser, jwtKey);
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _b.sent();
                        details = ex_1.message;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, {
                            status: status,
                            details: details,
                            token: token
                        }];
                }
            });
        });
    };
    UserService.makeUserAdmin = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, foundUserStatus, foundUserDetails, foundUser, user, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findUserById(_id)];
                    case 2:
                        _a = _b.sent(), foundUserStatus = _a.status, foundUserDetails = _a.details, foundUser = _a.user;
                        if (foundUserStatus !== http_status_codes_1.CONTINUE && !foundUser) {
                            status = foundUserStatus;
                            throw new Error(foundUserDetails);
                        }
                        user = foundUser;
                        user.isAdmin = true;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        user = _b.sent();
                        status = http_status_codes_1.OK;
                        details = user.toJSON();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _b.sent();
                        details = ex_2.message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    UserService.userLogin = function (detailsforQuerying, jwtLogin) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, status, details, token, error, user, validPassword, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = detailsforQuerying.email, password = detailsforQuerying.password;
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        token = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        error = this.validateLogin(detailsforQuerying).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("current email not found, please change it");
                        }
                        user = user;
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 3:
                        validPassword = _a.sent();
                        if (!validPassword) {
                            status = http_status_codes_1.NOT_FOUND;
                            details = "please type another password";
                        }
                        status = http_status_codes_1.OK;
                        details = user.toJSON();
                        token = this.generateAuthToken(user, jwtLogin);
                        return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _a.sent();
                        details = ex_3.message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            status: status,
                            details: details,
                            token: token
                        }];
                }
            });
        });
    };
    UserService.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, userStatus, userDetails, user, ex_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.findUserById(id)];
                    case 2:
                        _a = _b.sent(), userStatus = _a.status, userDetails = _a.details, user = _a.user;
                        if (userStatus !== http_status_codes_1.CONTINUE) {
                            status = userStatus;
                            throw new Error(userDetails);
                        }
                        status = http_status_codes_1.OK;
                        details = "found";
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                user: user
                            }];
                    case 3:
                        ex_4 = _b.sent();
                        details = ex_4.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    UserService.updateUser = function (_id, detailstoUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, user, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!_id) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("each of details is invalid- _id is mongoose object id, details to update is object");
                        }
                        return [4 /*yield*/, user_model_1.default.findByIdAndUpdate(_id, detailstoUpdate)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("user with given ID is not found into db");
                            ;
                        }
                        user = user;
                        status = http_status_codes_1.OK;
                        details = user.toJSON();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        details = ex_5.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    UserService.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.deleteUser = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, result, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (_id === "") {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("ID isn't given");
                        }
                        return [4 /*yield*/, user_model_1.default.findByIdAndDelete(_id)];
                    case 2:
                        result = _a.sent();
                        if (!result) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("Given ID isn't found in DB");
                        }
                        status = http_status_codes_1.OK;
                        details = "Succeed deleted";
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        details = ex_6.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    UserService.generateAuthToken = function (user, jwtPrivateKey) {
        var token = jsonwebtoken_1.default.sign({
            _id: user._id,
            isAdmin: user.isAdmin
        }, jwtPrivateKey);
        return token;
    };
    UserService.validateLogin = function (details) {
        var schema = {
            email: joi_1.default.string().email().required().min(5).max(255),
            password: joi_1.default.string().min(5).max(255)
        };
        return joi_1.validate(details, schema);
    };
    return UserService;
}(generalService_1.default));
exports.default = UserService;
