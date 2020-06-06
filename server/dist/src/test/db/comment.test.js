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
var mongoose_1 = require("mongoose");
var chai_1 = require("chai");
var bcrypt_1 = __importDefault(require("bcrypt"));
var http_status_codes_1 = require("http-status-codes");
var mochaAsync_1 = __importDefault(require("../mochaAsync"));
var iterableArray_1 = __importDefault(require("../../common/iterableArray"));
var user_model_1 = __importDefault(require("../../db/models/user.model"));
var product_model_1 = __importDefault(require("../../db/models/product.model"));
var category_model_1 = __importDefault(require("../../db/models/category.model"));
var comment_model_1 = __importDefault(require("../../db/models/comment.model"));
var comment_1 = __importDefault(require("../../db/services/comment"));
mocha_1.describe("Comment Module Testing", function () {
    mocha_1.describe("GET/:", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_1, iterablePasswords_1_1, encrypted, e_1_1, users, categories, products;
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
                            isAdmin: true,
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
                                isAdmin: true,
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 20:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 22:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 23:
                        categories = _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 24:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 27:
                        products = _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[0]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 28:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[2]._id,
                                product_id: products[1]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 29:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[1]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 30:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return comment with 0 elements, and status OK", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, comments;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.deleteMany({})];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, comment_1.default.getComments()];
                    case 2:
                        _a = _b.sent(), status = _a.status, comments = _a.comments;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(comments).to.have.length(0);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return comment with greater than 0 elements, and status OK", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, comments;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_1.default.getComments()];
                    case 1:
                        _a = _b.sent(), status = _a.status, comments = _a.comments;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(comments).to.have.length.greaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    mocha_1.describe("POST/: ", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_2, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_2, iterablePasswords_2_1, encrypted, e_2_1, users, categories, products;
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
                            isAdmin: true,
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
                                isAdmin: true,
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 20:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 22:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 23:
                        categories = _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 24:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 27:
                        products = _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[0]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 28:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[2]._id,
                                product_id: products[1]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 29:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[1]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 30:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return BAD_REQUEST when input is invalid", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var comment, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comment = {
                            user_id: "undefined",
                            product_id: "undefined",
                            title: "DG",
                            comment: "rGGGG",
                            rank: -3
                        };
                        return [4 /*yield*/, comment_1.default.addComment(comment)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return BAD_REQUEST when comment is found into db", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var users, products, comment, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.find({})];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 2:
                        products = _a.sent();
                        comment = {
                            user_id: users[0]._id,
                            title: "It's Shit!",
                            comment: "I don't Like this product, it is shitty and nothing",
                            product_id: products[0]._id,
                            rank: 4
                        };
                        return [4 /*yield*/, comment_1.default.addComment(comment)];
                    case 3:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("return NOT_FOUND  if product_id is is not found into DB", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var users, comment, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.find({})];
                    case 1:
                        users = _a.sent();
                        comment = {
                            user_id: users[0]._id,
                            title: "It's Shit!",
                            comment: "I don't Like this product, it is shitty and nothing",
                            product_id: mongoose_1.Types.ObjectId().toHexString(),
                            rank: 4
                        };
                        return [4 /*yield*/, comment_1.default.addComment(comment)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.eql(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return NOT_FOUND  if user_id is not found into DB", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var products, comment, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_model_1.default.find({})];
                    case 1:
                        products = _a.sent();
                        comment = {
                            user_id: mongoose_1.Types.ObjectId().toHexString(),
                            title: "It's Shit!",
                            comment: "I don't Like this product, it is shitty and nothing",
                            product_id: products[0]._id,
                            rank: 4
                        };
                        return [4 /*yield*/, comment_1.default.addComment(comment)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.eql(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should create new comment, and return status OK", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var users, products, comment, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.find({})];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 2:
                        products = _a.sent();
                        comment = {
                            user_id: users[2]._id,
                            title: "That's good",
                            comment: "I like this product, it is very good",
                            product_id: products[2]._id,
                            rank: 4
                        };
                        return [4 /*yield*/, comment_1.default.addComment(comment)];
                    case 3:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    mocha_1.describe("GET/: detailedcomment", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_3, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_3, iterablePasswords_3_1, encrypted, e_3_1, users, categories, products;
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
                            isAdmin: true,
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
                                isAdmin: true,
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 20:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 22:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 23:
                        categories = _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 24:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 27:
                        products = _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[0]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 28:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[2]._id,
                                product_id: products[1]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 29:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[1]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 30:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return BAD_REQUEST when id is empty", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_1.default.getDetailedComment("")];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return NOT_FOUND if id is not found", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = mongoose_1.Types.ObjectId().toHexString();
                        return [4 /*yield*/, comment_1.default.getDetailedComment(id)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return detailed comment, and OK", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var comments, id, _a, status, detailedComment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.find({})];
                    case 1:
                        comments = _b.sent();
                        id = comments[0]._id;
                        return [4 /*yield*/, comment_1.default.getDetailedComment(id)];
                    case 2:
                        _a = _b.sent(), status = _a.status, detailedComment = _a.detailedComment;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(detailedComment).not.to.be.undefined;
                        chai_1.expect(detailedComment).to.have.property("title", "It's Shit!");
                        chai_1.expect(detailedComment.user).to.have.property("fullName", "Ron Cohen");
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    mocha_1.describe("PUT/: ", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_4, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_4, iterablePasswords_4_1, encrypted, e_4_1, users, categories, products;
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
                            isAdmin: true,
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
                                isAdmin: true,
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 20:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 22:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 23:
                        categories = _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 24:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 27:
                        products = _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[0]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 28:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[2]._id,
                                product_id: products[1]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 29:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[1]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 30:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return BAD_REQUEST when id is empty", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_1.default.updateComment("", {})];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return NOT_FOUND if id is not found", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = mongoose_1.Types.ObjectId().toHexString();
                        return [4 /*yield*/, comment_1.default.updateComment(id, {})];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return INTERNAL_SERVER_ERROR when details to update is not invalid", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var comments, id, _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.find({})];
                    case 1:
                        comments = _b.sent();
                        id = comments[0]._id;
                        return [4 /*yield*/, comment_1.default.updateComment(id, { password: "xyz" })];
                    case 2:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        chai_1.expect(status).to.be.eqls(http_status_codes_1.BAD_REQUEST);
                        chai_1.expect(details).to.be.equal("Invalid input of object updating");
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should update object when details to update is empty", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var comments, id, _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.find({})];
                    case 1:
                        comments = _b.sent();
                        id = comments[0]._id;
                        return [4 /*yield*/, comment_1.default.updateComment(id, {})];
                    case 2:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        chai_1.expect(status).to.be.eqls(http_status_codes_1.OK);
                        chai_1.expect(details).to.be.equal("Object updated");
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should update object, return status OK, and object should be updated", function () { return __awaiter(_this, void 0, void 0, function () {
            var comments, id, title, _a, status, details, comment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.find({})];
                    case 1:
                        comments = _b.sent();
                        id = comments[0]._id;
                        title = "bullshit";
                        return [4 /*yield*/, comment_1.default.updateComment(id, { title: title })];
                    case 2:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        chai_1.expect(status).to.be.eqls(http_status_codes_1.OK);
                        chai_1.expect(details).to.be.equal("Object updated");
                        return [4 /*yield*/, comment_model_1.default.findById(id)];
                    case 3:
                        comment = _b.sent();
                        chai_1.expect(comment).to.have.property("title", "bullshit");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe("DELETE/: ", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_5, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_5, iterablePasswords_5_1, encrypted, e_5_1, users, categories, products;
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
                            isAdmin: true,
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
                                isAdmin: true,
                                fullName: 'Tal Leon',
                                address: 'Harav Maimon 15, Bat-yam',
                                email: 'tal222881@gmail.com',
                                password: encryptedPasswords[2]
                            })];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 20:
                        _b.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 22:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 23:
                        categories = _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 24:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 27:
                        products = _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[0]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 28:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[2]._id,
                                product_id: products[1]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 29:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[1]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "I don't Like this product, it is shitty and nothing",
                                rank: 1
                            })];
                    case 30:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return BAD_REQUEST when id is invalid", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_1.default.deleteComment("")];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return NOT_FOUND  when id to delete is not found in DB", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = mongoose_1.Types.ObjectId().toHexString();
                        return [4 /*yield*/, comment_1.default.deleteComment(id)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equals(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should delete intance from DB", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var comments, id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, comment_model_1.default.find({})];
                    case 1:
                        comments = _a.sent();
                        id = comments[0]._id;
                        return [4 /*yield*/, comment_1.default.deleteComment(id)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).be.equals(http_status_codes_1.OK);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
});
