"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mocha_1 = require("mocha");
var bcrypt_1 = __importDefault(require("bcrypt"));
var chai_1 = require("chai");
var config_1 = __importDefault(require("config"));
var mochaAsync_1 = __importDefault(require("../mochaAsync"));
var iterableArray_1 = __importDefault(require("../../common/iterableArray"));
var user_model_1 = __importDefault(require("../../db/models/user.model"));
var http_status_codes_1 = require("http-status-codes");
var index_1 = __importDefault(require("../../db/index"));
var user_model_2 = __importDefault(require("../../db/models/user.model"));
mocha_1.describe("User Model testing", function () {
    var jwtKey = config_1.default.get("jwtPrivateKey");
    mocha_1.describe("Testing POST /: -createUser()", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_1, iterablePasswords_1_1, encrypted, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        return [4 /*yield*/, iterableArray_1.default(passwords)];
                    case 2:
                        iterablePasswords = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        iterablePasswords_1 = __asyncValues(iterablePasswords);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, iterablePasswords_1.next()];
                    case 5:
                        if (!(iterablePasswords_1_1 = _b.sent(), !iterablePasswords_1_1.done)) return [3 /*break*/, 8];
                        password = iterablePasswords_1_1.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 6:
                        encrypted = _b.sent();
                        encryptedPasswords.push(encrypted);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(iterablePasswords_1_1 && !iterablePasswords_1_1.done && (_a = iterablePasswords_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(iterablePasswords_1)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should get status of BAD_REQUEST of wrong object', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var object, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        object = {
                            fullName: '',
                            address: 'hh',
                            email: '1333o3',
                            password: "aa"
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.createUser(object, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should get status of BAD_REQUEST of found user in db', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var object, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        object = {
                            fullName: 'David Levi',
                            address: 'Ben Gurion 109, Bat-yam',
                            email: 'davidlevi@gmail.com',
                            password: '123456'
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.createUser(object, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should get status OK  and return token not empty ', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var object, _a, status, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        object = {
                            fullName: 'Amir Benassayag',
                            address: 'agnon6, Bat-yam',
                            email: 'amir12061968@gmail.com',
                            password: '123456'
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.createUser(object, jwtKey)];
                    case 1:
                        _a = _b.sent(), status = _a.status, token = _a.token;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(token).to.be.not.equal('');
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    mocha_1.describe('Testing PUT /: -makeuserAdmin()', function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_2, iterablePasswords_2_1, encrypted, e_2_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        return [4 /*yield*/, iterableArray_1.default(passwords)];
                    case 2:
                        iterablePasswords = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        iterablePasswords_2 = __asyncValues(iterablePasswords);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, iterablePasswords_2.next()];
                    case 5:
                        if (!(iterablePasswords_2_1 = _b.sent(), !iterablePasswords_2_1.done)) return [3 /*break*/, 8];
                        password = iterablePasswords_2_1.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 6:
                        encrypted = _b.sent();
                        encryptedPasswords.push(encrypted);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(iterablePasswords_2_1 && !iterablePasswords_2_1.done && (_a = iterablePasswords_2.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(iterablePasswords_2)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should get BAD_REQUEST if input is empty', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.makeUserAdmin('')];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should get status of NOT_FOUND if user doesn\'t exist in db', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.makeUserAdmin("ABCDRE116789")];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should get status of OK if user changed mode to admin', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var userPoped, user, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_2.default.findOne({ fullName: "Tal Leon" })];
                    case 1:
                        userPoped = _a.sent();
                        user = userPoped;
                        return [4 /*yield*/, index_1.default.Services.UserService.makeUserAdmin(user._id)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
    });
    mocha_1.describe('Testing GET/: ->userLogin()', function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_3, iterablePasswords_3_1, encrypted, e_3_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        return [4 /*yield*/, iterableArray_1.default(passwords)];
                    case 2:
                        iterablePasswords = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        iterablePasswords_3 = __asyncValues(iterablePasswords);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, iterablePasswords_3.next()];
                    case 5:
                        if (!(iterablePasswords_3_1 = _b.sent(), !iterablePasswords_3_1.done)) return [3 /*break*/, 8];
                        password = iterablePasswords_3_1.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 6:
                        encrypted = _b.sent();
                        encryptedPasswords.push(encrypted);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(iterablePasswords_3_1 && !iterablePasswords_3_1.done && (_a = iterablePasswords_3.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(iterablePasswords_3)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should return BAD_REQUEST if input invalid', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var loginSchema, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginSchema = {
                            email: "amrrr",
                            password: "124"
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.userLogin(loginSchema, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_10 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should return NOT_FOUND if data if email is exist in DB', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var loginSchema, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginSchema = {
                            email: "amir12061968@gmail.com",
                            password: "ABCDEFG"
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.userLogin(loginSchema, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should return NOT_FOUND if data if password doesn\'t match', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var loginSchema, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginSchema = {
                            email: 'tal222881@gmail.com',
                            password: "ABCDEFG"
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.userLogin(loginSchema, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_12 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should return OK if user login is valid', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var loginSchema, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginSchema = {
                            email: "tal222881@gmail.com",
                            password: "talleon"
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.userLogin(loginSchema, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 5];
                    case 4:
                        ex_13 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
    });
    mocha_1.describe('PUT/: updateUser', function () {
        var detailsToUpdate = {
            address: 'Hashalom 67, Tel-Aviv'
        };
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_4, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_4, iterablePasswords_4_1, encrypted, e_4_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        return [4 /*yield*/, iterableArray_1.default(passwords)];
                    case 2:
                        iterablePasswords = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        iterablePasswords_4 = __asyncValues(iterablePasswords);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, iterablePasswords_4.next()];
                    case 5:
                        if (!(iterablePasswords_4_1 = _b.sent(), !iterablePasswords_4_1.done)) return [3 /*break*/, 8];
                        password = iterablePasswords_4_1.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 6:
                        encrypted = _b.sent();
                        encryptedPasswords.push(encrypted);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(iterablePasswords_4_1 && !iterablePasswords_4_1.done && (_a = iterablePasswords_4.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(iterablePasswords_4)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should get BAD_REQUEST if input is empty', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.updateUser(undefined, detailsToUpdate)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        ex_15 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should get NOT_FOUND if user is not found into db', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.updateUser(mongoose_1.Types.ObjectId(), detailsToUpdate)];
                    case 1:
                        status = (_a.sent()).status;
<<<<<<< HEAD
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
=======
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_16 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should get status OK if update is Succceed', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var userResult, user, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_2.default.findOne({ fullName: "Tal Leon" })];
                    case 1:
                        userResult = _a.sent();
                        user = userResult;
                        return [4 /*yield*/, index_1.default.Services.UserService.updateUser(user._id, detailsToUpdate)];
                    case 2:
                        status = (_a.sent()).status;
<<<<<<< HEAD
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        return [2 /*return*/];
=======
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_17 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
    });
    mocha_1.describe("GET/: GETALLUSERS", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_5, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_5, iterablePasswords_5_1, encrypted, e_5_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        return [4 /*yield*/, iterableArray_1.default(passwords)];
                    case 2:
                        iterablePasswords = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        iterablePasswords_5 = __asyncValues(iterablePasswords);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, iterablePasswords_5.next()];
                    case 5:
                        if (!(iterablePasswords_5_1 = _b.sent(), !iterablePasswords_5_1.done)) return [3 /*break*/, 8];
                        password = iterablePasswords_5_1.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 6:
                        encrypted = _b.sent();
                        encryptedPasswords.push(encrypted);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(iterablePasswords_5_1 && !iterablePasswords_5_1.done && (_a = iterablePasswords_5.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(iterablePasswords_5)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_5) throw e_5.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should return list of 0 users', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var users, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, index_1.default.Services.UserService.getAllUsers()];
                    case 2:
                        users = _a.sent();
                        chai_1.expect(users).length(0);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should return list of all users', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        chai_1.expect(users).length(3);
                        chai_1.expect(users[0]).property("fullName", "Ron Cohen");
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    mocha_1.describe("DELETE/:", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_6, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_6, iterablePasswords_6_1, encrypted, e_6_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        return [4 /*yield*/, iterableArray_1.default(passwords)];
                    case 2:
                        iterablePasswords = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        iterablePasswords_6 = __asyncValues(iterablePasswords);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, iterablePasswords_6.next()];
                    case 5:
                        if (!(iterablePasswords_6_1 = _b.sent(), !iterablePasswords_6_1.done)) return [3 /*break*/, 8];
                        password = iterablePasswords_6_1.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 6:
                        encrypted = _b.sent();
                        encryptedPasswords.push(encrypted);
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_6_1 = _b.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(iterablePasswords_6_1 && !iterablePasswords_6_1.done && (_a = iterablePasswords_6.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(iterablePasswords_6)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_6) throw e_6.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should return BAD_REQUEST status', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.deleteUser("")];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
<<<<<<< HEAD
                        return [2 /*return*/];
=======
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should return NOT_FOUND status', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.deleteUser(mongoose_1.Types.ObjectId())];
                    case 1:
                        status = (_a.sent()).status;
<<<<<<< HEAD
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
=======
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_22 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
        mocha_1.it('should  return status OK , and delete Tal Leon user', mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var user, status, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findOne({ fullName: "Tal Leon" })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, index_1.default.Services.UserService.deleteUser(user._id)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        return [4 /*yield*/, user_model_1.default.findById(user._id)];
                    case 3:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(null);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
