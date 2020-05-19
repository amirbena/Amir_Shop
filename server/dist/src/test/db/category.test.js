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
var mongoose_1 = require("mongoose");
var category_model_1 = __importDefault(require("../../db/models/category.model"));
var chai_1 = require("chai");
var HTTP_Enum_1 = __importDefault(require("../../common/HTTP_Enum"));
var index_1 = __importDefault(require("../../db/index"));
mocha_1.describe("Category module testing", function () {
    mocha_1.describe("POST/: addCategory", function () {
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Toys"
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Sports"
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_model_1.default.create({
                                category_name: "Beauty"
                            })
                            // tslint:disable-next-line: no-empty
                        ];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, category_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("returns BAD_REQUEST if Category input was wrong", function () { return __awaiter(_this, void 0, void 0, function () {
            var status, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.default.Services.CategoryService.addCategory({ category_name: "AB" })];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("returns BAD_REQUEST if Category is exist in db", function () { return __awaiter(_this, void 0, void 0, function () {
            var status, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, index_1.default.Services.CategoryService.addCategory({ category_name: "AB" })];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("returns OK and insert Category into db", function () { return __awaiter(_this, void 0, void 0, function () {
            var status, categories, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, index_1.default.Services.CategoryService.addCategory({ category_name: "Phones" })];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(HTTP_Enum_1.default.OK);
                        return [4 /*yield*/, category_model_1.default.find({})];
                    case 2:
                        categories = _a.sent();
                        chai_1.expect(categories).length(4);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe("GET/: getallcategories()", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var ex_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Toys"
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Sports"
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Beauty"
                                })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            ex_6 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var ex_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, category_model_1.default.deleteMany({})];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            ex_7 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return 0 elements of categories", function () { return __awaiter(_this, void 0, void 0, function () {
                var categories, ex_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, category_model_1.default.deleteMany({})];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getAllCategories()];
                        case 2:
                            categories = _a.sent();
                            chai_1.expect(categories).length(0);
                            return [3 /*break*/, 4];
                        case 3:
                            ex_8 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return 3 elements of  db categories", function () { return __awaiter(_this, void 0, void 0, function () {
                var categories, ex_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getAllCategories()];
                        case 1:
                            categories = _a.sent();
                            chai_1.expect(categories).length(3);
                            chai_1.expect(categories[0]).to.haveOwnProperty("category_name", "Toys");
                            chai_1.expect(categories[1]).to.haveOwnProperty("category_name", "Sports");
                            chai_1.expect(categories[2]).to.haveOwnProperty("category_name", "Beauty");
                            return [3 /*break*/, 3];
                        case 2:
                            ex_9 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    mocha_1.describe("GET/:id   -getCategoryById()", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var ex_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Toys"
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Sports"
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Beauty"
                                })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            ex_10 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var ex_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, category_model_1.default.deleteMany({})];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            ex_11 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return BAD_REQUEST of empty id", function () { return __awaiter(_this, void 0, void 0, function () {
                var object, ex_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById("")];
                        case 1:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById(undefined)];
                        case 2:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById(null)];
                        case 3:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById({})];
                        case 4:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById([])];
                        case 5:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [3 /*break*/, 7];
                        case 6:
                            ex_12 = _a.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return NOT_FOUND of not found id into db", function () { return __awaiter(_this, void 0, void 0, function () {
                var status, ex_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById(mongoose_1.Types.ObjectId)];
                        case 1:
                            status = (_a.sent()).status;
                            chai_1.expect(status).be.equal(HTTP_Enum_1.default.NOT_FOUND);
                            return [3 /*break*/, 3];
                        case 2:
                            ex_13 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return status OK, and category from db", function () { return __awaiter(_this, void 0, void 0, function () {
                var categoryToCheck, id, _a, status, category, checkedCategory, ex_14;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, category_model_1.default.findOne({ category_name: "Toys" })];
                        case 1:
                            categoryToCheck = _b.sent();
                            id = categoryToCheck._id;
                            return [4 /*yield*/, index_1.default.Services.CategoryService.getCategoryById(id)];
                        case 2:
                            _a = _b.sent(), status = _a.status, category = _a.category;
                            checkedCategory = category;
                            chai_1.expect(status).be.equal(HTTP_Enum_1.default.OK);
                            chai_1.expect(checkedCategory).haveOwnProperty("category_name", "Toys");
                            return [3 /*break*/, 4];
                        case 3:
                            ex_14 = _b.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    mocha_1.describe("DELETE/: -deleteCategory()", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var ex_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Toys"
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Sports"
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, category_model_1.default.create({
                                    category_name: "Beauty"
                                })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            ex_15 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
                var ex_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, category_model_1.default.deleteMany({})];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            ex_16 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return BAD_REQUEST status of invaid id", function () { return __awaiter(_this, void 0, void 0, function () {
                var object, ex_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory("")];
                        case 1:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory(undefined)];
                        case 2:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory(null)];
                        case 3:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory([])];
                        case 4:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory({})];
                        case 5:
                            object = _a.sent();
                            chai_1.expect(object.status).be.equal(HTTP_Enum_1.default.BAD_REQUEST);
                            return [3 /*break*/, 7];
                        case 6:
                            ex_17 = _a.sent();
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return NOT_FOUND stas of object is not found into DB", function () { return __awaiter(_this, void 0, void 0, function () {
                var id, status, ex_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = mongoose_1.Types.ObjectId();
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory(id)];
                        case 1:
                            status = (_a.sent()).status;
                            chai_1.expect(status).be.equals(HTTP_Enum_1.default.NOT_FOUND);
                            return [3 /*break*/, 3];
                        case 2:
                            ex_18 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            mocha_1.it("should return status OK,  and delete category from DB", function () { return __awaiter(_this, void 0, void 0, function () {
                var object, id, status, ex_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            object = void 0;
                            return [4 /*yield*/, category_model_1.default.findOne({ category_name: "Toys" })];
                        case 1:
                            object = _a.sent();
                            id = object._id;
                            return [4 /*yield*/, index_1.default.Services.CategoryService.deleteCategory(id)];
                        case 2:
                            status = (_a.sent()).status;
                            chai_1.expect(status).be.equals(HTTP_Enum_1.default.OK);
                            return [4 /*yield*/, category_model_1.default.findOne({ category_name: "Toys" })];
                        case 3:
                            object = _a.sent();
                            chai_1.expect(object).to.be.equals(null);
                            return [3 /*break*/, 5];
                        case 4:
                            ex_19 = _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
});
