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
var mocha_1 = require("mocha");
var chai_1 = require("chai");
var iterableArray_1 = __importDefault(require("../../common/iterableArray"));
var user_model_1 = __importDefault(require("../../db/models/user.model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var HTTP_Enum_1 = __importDefault(require("../../common/HTTP_Enum"));
var index_1 = __importDefault(require("../../db/index"));
var user_model_2 = __importDefault(require("../../db/models/user.model"));
var jwtKey = process.env.jwtPrivateKey;
mocha_1.describe("User Model testing", function () {
    mocha_1.describe("Testing POST /: -createUser()", function () {
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, passwords, salt, encryptedPasswords, password, _b, _c, encrypted, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(20)];
                    case 1:
                        salt = _d.sent();
                        encryptedPasswords = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        _b = __asyncValues(iterableArray_1.default(passwords));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
                        password = _c.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 5:
                        encrypted = _d.sent();
                        encryptedPasswords.push(encrypted);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(_b)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 15:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 17:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get status of BAD_REQUEST of wrong object', function () { return __awaiter(_this, void 0, void 0, function () {
            var object, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        object = {
                            fullName: '',
                            address: 44,
                            email: '1333o3',
                            password: true
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.createUser(object, jwtKey)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get status of BAD_REQUEST of found user in db', function () { return __awaiter(_this, void 0, void 0, function () {
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
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get status OK  and return token not empty ', function () { return __awaiter(_this, void 0, void 0, function () {
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
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.OK);
                        chai_1.expect(token).to.be.not.equal('');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe('Testing PUT /: -makeuserAdmin()', function () {
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2, _a, passwords, salt, encryptedPasswords, password, _b, _c, encrypted, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(20)];
                    case 1:
                        salt = _d.sent();
                        encryptedPasswords = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        _b = __asyncValues(iterableArray_1.default(passwords));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
                        password = _c.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 5:
                        encrypted = _d.sent();
                        encryptedPasswords.push(encrypted);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(_b)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 15:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 17:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get BAD_REQUEST if input is empty', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.makeUserAdmin('')];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get status of NOT_FOUND if user doesn\'t exist in db', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.makeUserAdmin("ABCDRE116789")];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get status of OK if user changed mode to admin', function () { return __awaiter(_this, void 0, void 0, function () {
            var userPoped, user, _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_model_2.default.findOne({ fullName: "Tal Leon" })];
                    case 1:
                        userPoped = _b.sent();
                        user = userPoped;
                        return [4 /*yield*/, index_1.default.Services.UserService.makeUserAdmin(user._id)];
                    case 2:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.OK);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe('Testing GET/: ->userLogin()', function () {
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3, _a, passwords, salt, encryptedPasswords, password, _b, _c, encrypted, e_3_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(20)];
                    case 1:
                        salt = _d.sent();
                        encryptedPasswords = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        _b = __asyncValues(iterableArray_1.default(passwords));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
                        password = _c.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 5:
                        encrypted = _d.sent();
                        encryptedPasswords.push(encrypted);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_3_1 = _d.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(_b)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 15:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 17:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should return BAD_REQUEST if input invalid', function () { return __awaiter(_this, void 0, void 0, function () {
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
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should return NOT_FOUND if data if email is exist in DB', function () { return __awaiter(_this, void 0, void 0, function () {
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
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should return NOT_FOUND if data if password doesn\'t match ', function () { return __awaiter(_this, void 0, void 0, function () {
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
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should return OK if user login is valid', function () { return __awaiter(_this, void 0, void 0, function () {
            var userResult, user, password, isEqual, loginSchema, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_2.default.findOne({ fullName: "Tal Leon" })];
                    case 1:
                        userResult = _a.sent();
                        if (!userResult) {
                            chai_1.expect(userResult).be.equal(undefined);
                        }
                        user = userResult;
                        password = "talleon";
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isEqual = _a.sent();
                        if (!isEqual) {
                            return [2 /*return*/];
                        }
                        loginSchema = {
                            email: "tal222881@gmail.com",
                            password: user.password
                        };
                        return [4 /*yield*/, index_1.default.Services.UserService.userLogin(loginSchema, jwtKey)];
                    case 3:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.OK);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe('PUT/: updateUser', function () {
        var detailsToUpdate = {
            address: 'Hashalom 67, Tel-Aviv'
        };
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_4, _a, passwords, salt, encryptedPasswords, password, _b, _c, encrypted, e_4_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt(20)];
                    case 1:
                        salt = _d.sent();
                        encryptedPasswords = [];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 14]);
                        _b = __asyncValues(iterableArray_1.default(passwords));
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
                        password = _c.value;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 5:
                        encrypted = _d.sent();
                        encryptedPasswords.push(encrypted);
                        _d.label = 6;
                    case 6: return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(_b)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_4) throw e_4.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [4 /*yield*/, user_model_1.default.create({
                            fullName: 'Ron Cohen',
                            address: 'Ben Gurion 99, Bat-yam',
                            email: 'roncohen@gmail.com',
                            password: encryptedPasswords[0]
                        })];
                    case 15:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'David Levi',
                                address: 'Ben Gurion 109, Bat-yam',
                                email: 'davidlevi@gmail.com',
                                password: encryptedPasswords[1]
                            })];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 17:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get BAD_REQUEST if input is empty', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.updateUser('', detailsToUpdate)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get NOT_FOUND if user is not found into db', function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_1.default.Services.UserService.updateUser('ABCDEF12355', detailsToUpdate)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it('should get status OK if update is Succceed', function () { return __awaiter(_this, void 0, void 0, function () {
            var userResult, user, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_2.default.findOne({ fullName: "Tal Leon" })];
                    case 1:
                        userResult = _a.sent();
                        if (!userResult) {
                            chai_1.expect(userResult).be.equal(undefined);
                        }
                        user = userResult;
                        return [4 /*yield*/, index_1.default.Services.UserService.updateUser(user.id, detailsToUpdate)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
