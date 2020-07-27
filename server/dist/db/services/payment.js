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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var payment_model_1 = __importStar(require("../models/payment.model"));
var product_model_1 = __importDefault(require("../models/product.model"));
var generalService_1 = __importDefault(require("../services/generalService"));
var http_status_codes_1 = require("http-status-codes");
var cart_1 = __importDefault(require("../services/cart"));
var iterableArray_1 = __importDefault(require("../../common/iterableArray"));
var PaymentService = /** @class */ (function (_super) {
    __extends(PaymentService, _super);
    function PaymentService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaymentService.addPayment = function (payment) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, error, userId, paymentMethodId, cartId, _a, statusUser, detailsUser, _b, statusPaymentMethod, detailsPaymentMethod, _c, statusCart, detailsCart, result, ex_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        error = payment_model_1.validatePayment(payment).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        userId = payment.userId, paymentMethodId = payment.paymentMethodId, cartId = payment.cartId;
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _d.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        return [4 /*yield*/, this.findUserById(paymentMethodId)];
                    case 3:
                        _b = _d.sent(), statusPaymentMethod = _b.status, detailsPaymentMethod = _b.details;
                        if (statusPaymentMethod !== http_status_codes_1.CONTINUE) {
                            status = statusPaymentMethod;
                            throw new Error(detailsPaymentMethod);
                        }
                        return [4 /*yield*/, this.findUserById(cartId)];
                    case 4:
                        _c = _d.sent(), statusCart = _c.status, detailsCart = _c.details;
                        if (statusCart !== http_status_codes_1.CONTINUE) {
                            status = statusCart;
                            throw new Error(detailsCart);
                        }
                        return [4 /*yield*/, payment_model_1.default.create(payment)];
                    case 5:
                        result = _d.sent();
                        status = http_status_codes_1.OK;
                        details = result.toJSON();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _d.sent();
                        details = ex_1.message;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    PaymentService.paymentPaid = function (paymentId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, paymentQuerying, statusPayment, detailsPayment, payment, _a, statusUpdating, detailsUpdating, _b, statusCart, detailsCart, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.findPaymentById(paymentId)];
                    case 2:
                        paymentQuerying = _c.sent();
                        statusPayment = paymentQuerying.status, detailsPayment = paymentQuerying.details;
                        payment = paymentQuerying.payment;
                        if (statusPayment !== http_status_codes_1.CONTINUE) {
                            status = statusPayment;
                            throw new Error(detailsPayment);
                        }
                        payment = payment;
                        return [4 /*yield*/, this.updateProduct(payment.cartId)];
                    case 3:
                        _a = _c.sent(), statusUpdating = _a.status, detailsUpdating = _a.details;
                        if (statusUpdating !== http_status_codes_1.CONTINUE) {
                            status = statusUpdating;
                            throw new Error(" " + detailsUpdating);
                        }
                        return [4 /*yield*/, cart_1.default.deleteCartById(payment.cartId)];
                    case 4:
                        _b = _c.sent(), statusCart = _b.status, detailsCart = _b.details;
                        if (statusCart !== http_status_codes_1.OK) {
                            status = statusCart;
                            throw new Error(detailsCart);
                        }
                        return [3 /*break*/, 6];
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
    PaymentService.getPayments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, payments, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, payment_model_1.default.find()];
                    case 2:
                        payments = _a.sent();
                        status = http_status_codes_1.OK;
                        details = payments.toString();
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                payments: payments
                            }];
                    case 3:
                        ex_3 = _a.sent();
                        details = ex_3.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    PaymentService.deletePayment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, deletedCount, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("Bad request");
                        }
                        return [4 /*yield*/, payment_model_1.default.deleteOne({ _id: id })];
                    case 2:
                        deletedCount = (_a.sent()).deletedCount;
                        if (!deletedCount) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("id is not found into db");
                        }
                        status = http_status_codes_1.OK;
                        details = "Item deleted in succeed";
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
    PaymentService.updateProduct = function (cartId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, status, details, _b, statusCart, detailsCart, cart, cartDetailsProducts, iterableCartDetails, cartDetail, iterableCartDetails_1, iterableCartDetails_1_1, productId, product, e_1_1, ex_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 18, , 19]);
                        return [4 /*yield*/, this.findCartById(cartId)];
                    case 2:
                        _b = _c.sent(), statusCart = _b.status, detailsCart = _b.details, cart = _b.cart;
                        if (statusCart !== http_status_codes_1.CONTINUE) {
                            status = statusCart;
                            throw new Error(detailsCart);
                        }
                        cartDetailsProducts = cart.products;
                        return [4 /*yield*/, iterableArray_1.default(cartDetailsProducts)];
                    case 3:
                        iterableCartDetails = _c.sent();
                        cartDetail = void 0;
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 11, 12, 17]);
                        iterableCartDetails_1 = __asyncValues(iterableCartDetails);
                        _c.label = 5;
                    case 5: return [4 /*yield*/, iterableCartDetails_1.next()];
                    case 6:
                        if (!(iterableCartDetails_1_1 = _c.sent(), !iterableCartDetails_1_1.done)) return [3 /*break*/, 10];
                        cartDetail = iterableCartDetails_1_1.value;
                        productId = cartDetail.productId;
                        return [4 /*yield*/, product_model_1.default.findById(productId)];
                    case 7:
                        product = _c.sent();
                        if (!product) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("one of products not found into db");
                        }
                        product.amount -= cartDetail.amountBuying;
                        return [4 /*yield*/, product.save()];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: return [3 /*break*/, 5];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _c.trys.push([12, , 15, 16]);
                        if (!(iterableCartDetails_1_1 && !iterableCartDetails_1_1.done && (_a = iterableCartDetails_1.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _a.call(iterableCartDetails_1)];
                    case 13:
                        _c.sent();
                        _c.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17:
                        status = http_status_codes_1.CONTINUE;
                        details = "succeed to update";
                        return [3 /*break*/, 19];
                    case 18:
                        ex_5 = _c.sent();
                        details = ex_5.message;
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    return PaymentService;
}(generalService_1.default));
exports.default = PaymentService;
