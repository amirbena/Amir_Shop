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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var category_model_1 = __importDefault(require("../../db/models/category.model"));
var mochaAsync_1 = __importDefault(require("../mochaAsync"));
var user_model_1 = __importDefault(require("../../db/models/user.model"));
var product_model_1 = __importDefault(require("../../db/models/product.model"));
var mongoose_1 = require("mongoose");
var chai_1 = require("chai");
var http_status_codes_1 = require("http-status-codes");
var index_1 = __importDefault(require("../../db/index"));
mocha_1.describe("Product Module testing", function () {
    mocha_1.describe("POST/:  - addProduct()", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var users, categories, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: "Amir Benassayag",
                                address: "Agnon 6 Bat-yam",
                                email: "amir12061968@gmail.com",
                                password: "12345678",
                                isAdmin: true
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                fullName: "Tal Leon",
                                address: "Maimon 15 Bat-yam",
                                email: "talleon@gmail.com",
                                password: "12345678",
                                isAdmin: true
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 3:
                        users = _a.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 7:
                        categories = _a.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[0]._id,
                                name: "Barbie",
                                price_for_each: 5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[0]._id,
                                admin_id: users[1]._id,
                                name: "Can",
                                price_for_each: 4.5,
                                amount: 1000,
                                image_url: "axtttklgmg.png"
                            })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, product_model_1.default.create({
                                category_id: categories[2]._id,
                                admin_id: users[1]._id,
                                name: "Make-up",
                                price_for_each: 3,
                                amount: 15000,
                                image_url: "axtttklgmg.png"
                            })
                            // tslint:disable-next-line: no-empty
                        ];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        ex_1 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_1.message);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, product_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, user_model_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_2 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should get BAD_REQUEST when product is invalid", function () { return __awaiter(_this, void 0, void 0, function () {
            var product, status, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        product = {
                            admin_id: mongoose_1.Types.ObjectId(),
                            category_id: mongoose_1.Types.ObjectId(),
                            name: "rr",
                            price_for_each: 0.25,
                            amount: 0.5,
                            image_url: ""
                        };
                        return [4 /*yield*/, index_1.default.Services.ProductService.addProduct(product)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should get BAD_REQUEST when category is invalid", function () { return __awaiter(_this, void 0, void 0, function () {
            var product, status, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        product = {
                            admin_id: mongoose_1.Types.ObjectId(),
                            category_id: null,
                            name: "AMIROS",
                            price_for_each: 0.55,
                            amount: 20,
                            image_url: "GGKGGKGKGKG"
                        };
                        return [4 /*yield*/, index_1.default.Services.ProductService.addProduct(product)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should get NOT_FOUND  when category not found", function () { return __awaiter(_this, void 0, void 0, function () {
            var product, status, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        product = {
                            admin_id: mongoose_1.Types.ObjectId(),
                            category_id: mongoose_1.Types.ObjectId(),
                            name: "AMIROS",
                            price_for_each: 0.55,
                            amount: 20,
                            image_url: "GGKGGKGKGKG"
                        };
                        return [4 /*yield*/, index_1.default.Services.ProductService.addProduct(product)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should get BAD_REQUEST when admin is invalid", function () { return __awaiter(_this, void 0, void 0, function () {
            var product, status, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        product = {
                            admin_id: undefined,
                            category_id: mongoose_1.Types.ObjectId(),
                            name: "AMIROS",
                            price_for_each: 0.55,
                            amount: 20,
                            image_url: "GGKGGKGKGKG"
                        };
                        return [4 /*yield*/, index_1.default.Services.ProductService.addProduct(product)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_6 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_6.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should get NOT_FOUND  when category not found", function () { return __awaiter(_this, void 0, void 0, function () {
            var product, status, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        product = {
                            admin_id: mongoose_1.Types.ObjectId(),
                            category_id: mongoose_1.Types.ObjectId(),
                            name: "AMIROS",
                            price_for_each: 0.55,
                            amount: 20,
                            image_url: "GGKGGKGKGKG"
                        };
                        return [4 /*yield*/, index_1.default.Services.ProductService.addProduct(product)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_7.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should get OK status, and get new product", function () { return __awaiter(_this, void 0, void 0, function () {
            var users, categories, product, _a, status, productAdded, productAdd, ex_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, user_model_1.default.find({})];
                    case 1:
                        users = _b.sent();
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 2:
                        categories = _b.sent();
                        product = {
                            admin_id: users[1]._id,
                            category_id: categories[1]._id,
                            name: "sockes",
                            price_for_each: 0.55,
                            amount: 20,
                            image_url: "GGKGGKGKGKG"
                        };
                        return [4 /*yield*/, index_1.default.Services.ProductService.addProduct(product)];
                    case 3:
                        _a = _b.sent(), status = _a.status, productAdded = _a.product;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        productAdd = productAdded;
                        chai_1.expect(productAdd).to.include({
                            admin_id: users[1]._id,
                            category_id: categories[1]._id,
                            name: "sockes",
                            price_for_each: 0.55,
                            amount: 20,
                            image_url: "GGKGGKGKGKG"
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        ex_8 = _b.sent();
                        // tslint:disable-next-line: no-console
                        console.log(ex_8.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    });
});
