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
var bcrypt_1 = __importDefault(require("bcrypt"));
var iterableArray_1 = __importDefault(require("../../common/iterableArray"));
var user_model_1 = __importDefault(require("../../db/models/user.model"));
var product_model_1 = __importDefault(require("../../db/models/product.model"));
var category_model_1 = __importDefault(require("../../db/models/category.model"));
var comment_model_1 = __importDefault(require("../../db/models/comment.model"));
mocha_1.describe("Comment Module Testing", function () {
    mocha_1.describe("GET/:", function () {
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, passwords, salt, encryptedPasswords, password, iterablePasswords, iterablePasswords_1, iterablePasswords_1_1, encrypted, e_1_1, users, categories, products, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 28, , 29]);
                        passwords = ['123456', '123456', 'talleon'];
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        encryptedPasswords = [];
                        password = void 0;
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
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 19:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 20:
                        categories = _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 22:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 23:
                        _b.sent();
                        return [4 /*yield*/, product_model_1.default.find({})];
                    case 24:
                        products = _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[0]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "Zona",
                                rank: 1
                            })];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[2]._id,
                                product_id: products[1]._id,
                                title: "It's Shit!",
                                comment: "Zona",
                                rank: 1
                            })];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, comment_model_1.default.create({
                                user_id: users[3]._id,
                                product_id: products[0]._id,
                                title: "It's Shit!",
                                comment: "Zona",
                                rank: 1
                            })];
                    case 27:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 28:
                        error_1 = _b.sent();
                        return [3 /*break*/, 29];
                    case 29: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, comment_model_1.default.deleteMany({})];
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
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    });
});
