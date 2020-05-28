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
Object.defineProperty(exports, "__esModule", { value: true });
var category_model_1 = __importDefault(require("../models/category.model"));
var product_model_1 = __importDefault(require("../models/product.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var cart_model_1 = __importDefault(require("./../models/cart.model"));
var paymentMethod_model_1 = __importDefault(require("../models/paymentMethod.model"));
var payment_model_1 = __importDefault(require("../models/payment.model"));
var comment_model_1 = __importDefault(require("../models/comment.model"));
var http_status_codes_1 = require("http-status-codes");
var GeneralService = /** @class */ (function () {
    function GeneralService() {
    }
    GeneralService.findUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, user, ex_1;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, user_model_1.default.findById(id)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("user is not found in db");
                        }
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                user: user
                            }];
                    case 3:
                        ex_1 = _a.sent();
                        details = ex_1.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    GeneralService.findCategoryById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, category, ex_2;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, category_model_1.default.findById(id)];
                    case 2:
                        category = _a.sent();
                        if (!category) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("category is not found in db");
                        }
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                category: category
                            }];
                    case 3:
                        ex_2 = _a.sent();
                        details = ex_2.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    GeneralService.findCartById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, cart, ex_3;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, cart_model_1.default.findById(id)];
                    case 2:
                        cart = _a.sent();
                        if (!cart) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("product is not found in db");
                        }
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                cart: cart
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
    GeneralService.findProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, product, ex_4;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, product_model_1.default.findById(id)];
                    case 2:
                        product = _a.sent();
                        if (!product) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("product is not found in db");
                        }
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                product: product
                            }];
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
    GeneralService.findPaymentMethodAccordingId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, paymentMethod, ex_5;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, paymentMethod_model_1.default.findById(id)];
                    case 2:
                        paymentMethod = _a.sent();
                        if (!paymentMethod) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("Payment Method not found into db");
                        }
                        paymentMethod = paymentMethod;
                        details = paymentMethod.toString();
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                paymentMethod: paymentMethod
                            }];
                    case 3:
                        ex_5 = _a.sent();
                        details = ex_5.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details,
                        }];
                }
            });
        });
    };
    GeneralService.findCommentById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, comment, ex_6;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, comment_model_1.default.findById(id)];
                    case 2:
                        comment = _a.sent();
                        if (!comment) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("comment is not found in db");
                        }
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                comment: comment
                            }];
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
    GeneralService.findPaymentById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, payment, ex_7;
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
                            throw new Error("Invalid parameter at id");
                        }
                        return [4 /*yield*/, payment_model_1.default.findById(id)];
                    case 2:
                        payment = _a.sent();
                        if (!payment) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("payment is not found in db");
                        }
                        status = http_status_codes_1.CONTINUE;
                        return [2 /*return*/, {
                                status: status,
                                payment: payment
                            }];
                    case 3:
                        ex_7 = _a.sent();
                        details = ex_7.message;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, {
                            status: status,
                            details: details
                        }];
                }
            });
        });
    };
    return GeneralService;
}());
exports.default = GeneralService;
