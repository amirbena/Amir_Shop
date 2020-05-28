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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var iterableArray_1 = __importDefault(require("../../common/iterableArray"));
var comment_model_1 = __importDefault(require("../models/comment.model"));
var product_model_1 = __importStar(require("../models/product.model"));
var http_status_codes_1 = require("http-status-codes");
var generalService_1 = __importDefault(require("./generalService"));
var ProductService = /** @class */ (function (_super) {
    __extends(ProductService, _super);
    function ProductService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductService.addProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, error, _a, statusCategory, detailsCategory, _b, statusAdmin, detailsAdmin, productAdded, ex_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        error = product_model_1.validateProduct(product).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, this.findCategoryById(product.category_id)];
                    case 2:
                        _a = _c.sent(), statusCategory = _a.status, detailsCategory = _a.details;
                        if (statusCategory !== http_status_codes_1.CONTINUE) {
                            status = statusCategory;
                            throw new Error(detailsCategory);
                        }
                        return [4 /*yield*/, this.findUserById(product.admin_id)];
                    case 3:
                        _b = _c.sent(), statusAdmin = _b.status, detailsAdmin = _b.details;
                        if (statusAdmin !== http_status_codes_1.CONTINUE) {
                            status = statusAdmin;
                            throw new Error(detailsAdmin);
                        }
                        return [4 /*yield*/, product_model_1.default.create(product)];
                    case 4:
                        productAdded = _c.sent();
                        status = http_status_codes_1.OK;
                        details = productAdded.toJSON();
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                product: productAdded
                            }];
                    case 5:
                        ex_1 = _c.sent();
                        details = ex_1.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    ProductService.getDetailedProductById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, product, _a, statusCategory, detailsCategory, category, _b, statusAdmin, detailsAdmin, admin, _id, name, price_for_each, amount, image_url, detailedProduct, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (!productId) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("invalid product id - undefinded / null");
                        }
                        return [4 /*yield*/, product_model_1.default.findById(productId)];
                    case 2:
                        product = _c.sent();
                        if (!product) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("product is not found into db");
                        }
                        return [4 /*yield*/, this.findCategoryById(product.category_id)];
                    case 3:
                        _a = _c.sent(), statusCategory = _a.status, detailsCategory = _a.details, category = _a.category;
                        if (statusCategory !== http_status_codes_1.CONTINUE) {
                            status = statusCategory;
                            throw new Error(detailsCategory);
                        }
                        return [4 /*yield*/, this.findUserById(product.admin_id)];
                    case 4:
                        _b = _c.sent(), statusAdmin = _b.status, detailsAdmin = _b.details, admin = _b.user;
                        if (statusAdmin !== http_status_codes_1.CONTINUE) {
                            status = statusAdmin;
                            throw new Error(detailsAdmin);
                        }
                        _id = product._id, name = product.name, price_for_each = product.price_for_each, amount = product.amount, image_url = product.image_url;
                        detailedProduct = {
                            _id: _id,
                            category: category,
                            admin: admin,
                            name: name,
                            price_for_each: price_for_each,
                            amount: amount,
                            image_url: image_url
                        };
                        status = http_status_codes_1.OK;
                        details = "Succeed found";
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                detailedProduct: detailedProduct
                            }];
                    case 5:
                        ex_2 = _c.sent();
                        details = ex_2.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    ProductService.getDetailedProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, status, details, detailedProducts, products, _b, _c, product, _d, productStatus, detailedProductStatus, detailedProduct, e_1_1, ex_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        detailedProducts = [];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 17, , 18]);
                        return [4 /*yield*/, product_model_1.default.find()];
                    case 2:
                        products = _e.sent();
                        if (!products.length) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("not found products into db");
                        }
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 10, 11, 16]);
                        return [4 /*yield*/, iterableArray_1.default(products)];
                    case 4:
                        _b = __asyncValues.apply(void 0, [_e.sent()]);
                        _e.label = 5;
                    case 5: return [4 /*yield*/, _b.next()];
                    case 6:
                        if (!(_c = _e.sent(), !_c.done)) return [3 /*break*/, 9];
                        product = _c.value;
                        return [4 /*yield*/, this.getDetailedProductById(product._id)];
                    case 7:
                        _d = _e.sent(), productStatus = _d.status, detailedProductStatus = _d.details, detailedProduct = _d.detailedProduct;
                        if (productStatus !== http_status_codes_1.OK) {
                            status = productStatus;
                            throw new Error(detailedProductStatus);
                        }
                        detailedProducts.push(detailedProduct);
                        _e.label = 8;
                    case 8: return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(_b)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        status = http_status_codes_1.OK;
                        details = "succeeed to find";
                        return [3 /*break*/, 18];
                    case 17:
                        ex_3 = _e.sent();
                        details = ex_3.message;
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/, {
                            status: status,
                            details: details,
                            detailedProducts: detailedProducts
                        }];
                }
            });
        });
    };
    ProductService.updateProductDetails = function (productId, detailsToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, updatedProduct, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!productId) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("Product is null or undefined");
                        }
                        return [4 /*yield*/, product_model_1.default.findOneAndUpdate({ _id: productId }, detailsToUpdate)];
                    case 2:
                        updatedProduct = _a.sent();
                        if (!updatedProduct) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("product is not found");
                        }
                        status = http_status_codes_1.OK;
                        details = "Product updated";
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
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
    ProductService.getAvgRankForEachProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, status, details, _b, statusProduct, detailsProduct, product, comments, avgRank, _c, _d, comment, e_2_1, ex_5;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 17, , 18]);
                        return [4 /*yield*/, this.findProductById(id)];
                    case 2:
                        _b = _e.sent(), statusProduct = _b.status, detailsProduct = _b.details, product = _b.product;
                        if (statusProduct !== http_status_codes_1.CONTINUE) {
                            status = statusProduct;
                            throw new Error(detailsProduct);
                        }
                        return [4 /*yield*/, comment_model_1.default.find({ product_id: product._id })];
                    case 3:
                        comments = _e.sent();
                        if (!comments.length) {
                            throw new Error("no comments for this product");
                        }
                        avgRank = 0;
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, 10, 11, 16]);
                        return [4 /*yield*/, iterableArray_1.default(comments)];
                    case 5:
                        _c = __asyncValues.apply(void 0, [_e.sent()]);
                        _e.label = 6;
                    case 6: return [4 /*yield*/, _c.next()];
                    case 7:
                        if (!(_d = _e.sent(), !_d.done)) return [3 /*break*/, 9];
                        comment = _d.value;
                        avgRank += comment.rank;
                        _e.label = 8;
                    case 8: return [3 /*break*/, 6];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _e.trys.push([11, , 14, 15]);
                        if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(_c)];
                    case 12:
                        _e.sent();
                        _e.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        avgRank = avgRank / comments.length;
                        status = http_status_codes_1.OK;
                        return [2 /*return*/, {
                                status: status,
                                avgRank: avgRank
                            }];
                    case 17:
                        ex_5 = _e.sent();
                        details = ex_5.message;
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/, {
                            details: details,
                            status: status
                        }];
                }
            });
        });
    };
    ProductService.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_model_1.default.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.deleteProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, product, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!productId) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("productId is invalid");
                        }
                        return [4 /*yield*/, product_model_1.default.findByIdAndDelete(productId)];
                    case 2:
                        product = _a.sent();
                        if (!product) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("product is not found");
                        }
                        status = http_status_codes_1.OK;
                        details = "delete is succeed";
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
    return ProductService;
}(generalService_1.default));
exports.default = ProductService;
