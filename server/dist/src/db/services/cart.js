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
var cart_model_1 = __importStar(require("../models/cart.model"));
var generalService_1 = __importDefault(require("./generalService"));
var http_status_codes_1 = require("http-status-codes");
var CartService = /** @class */ (function (_super) {
    __extends(CartService, _super);
    function CartService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CartService.createNewCart = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, statusUser, detailsUser, object, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _b.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        return [4 /*yield*/, cart_model_1.default.create({ userId: userId })];
                    case 3:
                        object = _b.sent();
                        status = http_status_codes_1.OK;
                        details = object.toJSON();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        details = ex_1.message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    CartService.addItemtoCart = function (userId, cartDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, statusUser, detailsUser, schema, error, cart, _b, statusProduct, detailsProduct, product, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _c.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        schema = {
                            userId: userId,
                            product: cartDetails
                        };
                        error = cart_model_1.validateCart(schema).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({ userId: userId, date: new Date() })];
                    case 3:
                        cart = _c.sent();
                        if (!cart) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("Cart not found");
                        }
                        return [4 /*yield*/, this.findProductById(cartDetails.productId)];
                    case 4:
                        _b = _c.sent(), statusProduct = _b.status, detailsProduct = _b.details, product = _b.product;
                        if (statusProduct !== http_status_codes_1.CONTINUE) {
                            status = statusProduct;
                            throw new Error(detailsProduct);
                        }
                        cart.sum += product.price_for_each * cartDetails.amountBuying;
                        cart.products.push(cartDetails);
                        return [4 /*yield*/, cart.save()];
                    case 5:
                        cart = _c.sent();
                        status = http_status_codes_1.OK;
                        details = cart.toJSON();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_2 = _c.sent();
                        details = ex_2.message;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    CartService.deleteAllCartAccordingUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, statusUser, detailsUser, _b, ok, deletedCount, ex_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _c.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        return [4 /*yield*/, cart_model_1.default.deleteMany({ userId: userId })];
                    case 3:
                        _b = _c.sent(), ok = _b.ok, deletedCount = _b.deletedCount;
                        if (!deletedCount) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("No Carts found in this user");
                        }
                        status = http_status_codes_1.OK;
                        details = "Succeed delete all carts  that belong that belongs to this user";
                        return [3 /*break*/, 5];
                    case 4:
                        ex_3 = _c.sent();
                        details = ex_3.message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    CartService.changeElementsforProduct = function (userId, changedDetails, sign) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, statusUser, detailsUser, schema, error, cart, _b, statusProduct, detailsProudct, product, addToCart, index, changedSum, ex_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _c.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        schema = {
                            userId: userId,
                            product: changedDetails
                        };
                        error = cart_model_1.validateCart(schema).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({ userId: userId, date: new Date() })];
                    case 3:
                        cart = _c.sent();
                        if (!cart) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("Cart not found");
                        }
                        return [4 /*yield*/, this.findProductById(changedDetails.productId)];
                    case 4:
                        _b = _c.sent(), statusProduct = _b.status, detailsProudct = _b.details, product = _b.product;
                        if (statusProduct !== http_status_codes_1.OK) {
                            status = statusProduct;
                            throw new Error(detailsProudct);
                        }
                        addToCart = cart.products.find(function (cartdetail) { return changedDetails.productId === cartdetail.productId; });
                        if (!addToCart) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("detals not found");
                        }
                        index = cart.products.findIndex(function (cartdetail) { return changedDetails.productId === cartdetail.productId; });
                        changedSum = addToCart.amountBuying * product.price_for_each;
                        if (sign === "-") {
                            addToCart.amountBuying -= changedDetails.amountBuying;
                            cart.sum -= changedSum;
                            if (cart.sum <= 0) {
                                cart.sum = 0;
                            }
                        }
                        else {
                            if (sign === "+") {
                                addToCart.amountBuying += changedDetails.amountBuying;
                                cart.sum += changedSum;
                            }
                        }
                        cart.products[index] = addToCart;
                        return [4 /*yield*/, cart.save()];
                    case 5:
                        cart = _c.sent();
                        status = http_status_codes_1.OK;
                        details = cart.toJSON();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_4 = _c.sent();
                        details = ex_4.message;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    CartService.deleteSpecificCart = function (userId, dateString) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, date, _a, statusUser, detailsUser, deletedCount, ex_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        date = new Date(dateString);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _b.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        return [4 /*yield*/, cart_model_1.default.deleteOne({ userId: userId, date: date })];
                    case 3:
                        deletedCount = (_b.sent()).deletedCount;
                        if (!deletedCount) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("Can't find current cart");
                        }
                        status = http_status_codes_1.OK;
                        details = "succeed deleting";
                        return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _b.sent();
                        details = ex_5.message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    CartService.deleteCartById = function (cartId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, deletedCount, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cart_model_1.default.deleteOne({ _id: cartId })];
                    case 2:
                        deletedCount = (_a.sent()).deletedCount;
                        if (!deletedCount) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("cart is not found");
                        }
                        status = http_status_codes_1.OK;
                        details = "cart deleted";
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
    CartService.getCartbyUserAndDate = function (userId, dateString) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, date, _a, statusUser, detailsUser, cart, ex_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        date = new Date(dateString);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.findUserById(userId)];
                    case 2:
                        _a = _b.sent(), statusUser = _a.status, detailsUser = _a.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({ userId: userId, date: date })];
                    case 3:
                        cart = _b.sent();
                        if (!cart) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("the cart is not found");
                        }
                        cart = cart;
                        status = http_status_codes_1.OK;
                        details = cart.toJSON();
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                cart: cart
                            }];
                    case 4:
                        ex_7 = _b.sent();
                        details = ex_7.message;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    CartService.getCartById = function (cartId) {
        return __awaiter(this, void 0, void 0, function () {
            var details, _a, status, cartDetails, cart, ex_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        details = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.findCartById(cartId)];
                    case 2:
                        _a = _b.sent(), status = _a.status, cartDetails = _a.details, cart = _a.cart;
                        if (status !== http_status_codes_1.OK) {
                            return [2 /*return*/, {
                                    status: status,
                                    details: cartDetails
                                }];
                        }
                        return [2 /*return*/, {
                                status: http_status_codes_1.OK,
                                details: details,
                                cart: cart
                            }];
                    case 3:
                        ex_8 = _b.sent();
                        details = ex_8.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CartService;
}(generalService_1.default));
exports.default = CartService;
