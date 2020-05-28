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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var dbServices_1 = __importDefault(require("../db/startup/dbServices"));
var generalRoute_route_1 = __importDefault(require("./generalRoute.route"));
var auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
var admin_middleware_1 = __importDefault(require("./middlewares/admin.middleware"));
var iterableArray_1 = __importDefault(require("../common/iterableArray"));
var http_status_codes_1 = require("http-status-codes");
var ProductService = dbServices_1.default.ProductService;
var ProductRoute = /** @class */ (function (_super) {
    __extends(ProductRoute, _super);
    function ProductRoute() {
        var _this = _super.call(this) || this;
        _this.addProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ProductService.addProduct(req.body)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        res.status(status).send({
                            status: status,
                            details: details
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getDetailedProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details, detailedProduct;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ProductService.getDetailedProductById(req.body.id)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details, detailedProduct = _a.detailedProduct;
                        if (!detailedProduct)
                            return [2 /*return*/, res.status(status).send({ status: status, details: details })];
                        res.send({
                            status: status,
                            detailedProduct: detailedProduct,
                            details: details
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getDetailedProducts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_1, _a, _b, status, details, detailedProducts, detailedProduct, detailedAvgProducts, _c, _d, _e, statusChecking, detailsChecking, avgRank, e_1_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, ProductService.getDetailedProducts()];
                    case 1:
                        _b = _f.sent(), status = _b.status, details = _b.details, detailedProducts = _b.detailedProducts;
                        if (!detailedProducts)
                            return [2 /*return*/, res.status(status).send({ status: status, details: details })];
                        detailedAvgProducts = [];
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 9, 10, 15]);
                        return [4 /*yield*/, iterableArray_1.default(detailedProducts)];
                    case 3:
                        _c = __asyncValues.apply(void 0, [_f.sent()]);
                        _f.label = 4;
                    case 4: return [4 /*yield*/, _c.next()];
                    case 5:
                        if (!(_d = _f.sent(), !_d.done)) return [3 /*break*/, 8];
                        detailedProduct = _d.value;
                        return [4 /*yield*/, ProductService.getAvgRankForEachProduct(detailedProduct._id)];
                    case 6:
                        _e = _f.sent(), statusChecking = _e.status, detailsChecking = _e.details, avgRank = _e.avgRank;
                        if (detailsChecking)
                            return [2 /*return*/, res.status(statusChecking).send({
                                    status: statusChecking,
                                    details: detailsChecking
                                })];
                        detailedProduct = __assign({}, detailedProduct, { avgRank: avgRank });
                        detailedAvgProducts.push(detailedProduct);
                        _f.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _f.trys.push([10, , 13, 14]);
                        if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(_c)];
                    case 11:
                        _f.sent();
                        _f.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15:
                        res.send({
                            status: status,
                            details: details,
                            detailedProducts: detailedAvgProducts
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.updateProductDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, productId, detailsUpdates, _b, status, details;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, productId = _a.productId, detailsUpdates = _a.detailsUpdates;
                        return [4 /*yield*/, ProductService.updateProductDetails(productId, detailsUpdates)];
                    case 1:
                        _b = _c.sent(), status = _b.status, details = _b.details;
                        res.status(status).send({
                            details: details,
                            status: status
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.deleteProduct = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ProductService.deleteProduct(req.body.productId)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        res.status(status).send({ status: status, details: details });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getProducts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var products, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ProductService.getProducts()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.send({
                                status: http_status_codes_1.OK,
                                details: products
                            })];
                    case 2:
                        ex_1 = _a.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send({
                                status: http_status_codes_1.INTERNAL_SERVER_ERROR,
                                details: ex_1.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.path = "/products";
        _this.intializeRoutes();
        return _this;
    }
    ProductRoute.prototype.intializeRoutes = function () {
        this.router.post(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.addProduct);
        this.router.get(this.path + "/detailedProduct", [auth_middleware_1.default, admin_middleware_1.default], this.getDetailedProduct);
        this.router.get(this.path + "/detailedProducts", [auth_middleware_1.default, admin_middleware_1.default], this.getDetailedProduct);
        this.router.put(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.updateProductDetails);
        this.router.delete(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.deleteProduct);
        this.router.get(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.getProducts);
    };
    return ProductRoute;
}(generalRoute_route_1.default));
exports.default = ProductRoute;
