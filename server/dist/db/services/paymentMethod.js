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
var paymentMethod_model_1 = __importStar(require("../models/paymentMethod.model"));
var HTTP_Enum_1 = __importDefault(require("../../common/HTTP_Enum"));
var generalService_1 = __importDefault(require("./generalService"));
var OK = HTTP_Enum_1.default.OK, INTERNAL_SERVER_ERROR = HTTP_Enum_1.default.INTERNAL_SERVER_ERROR, CONTINUE = HTTP_Enum_1.default.CONTINUE, BAD_REQUEST = HTTP_Enum_1.default.BAD_REQUEST, NOT_FOUND = HTTP_Enum_1.default.NOT_FOUND;
var PaymentMethodService = /** @class */ (function (_super) {
    __extends(PaymentMethodService, _super);
    function PaymentMethodService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaymentMethodService.addPaymentMethod = function (paymentMethod) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, error, result, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        error = paymentMethod_model_1.validatePaymentMethod(paymentMethod).error;
                        if (error) {
                            status = BAD_REQUEST;
                            throw new Error("Invalid input of payment method");
                        }
                        return [4 /*yield*/, paymentMethod_model_1.default.findOne({ paymentMethod: paymentMethod.paymentMethod })];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            status = BAD_REQUEST;
                            throw new Error("has exsiting same payment method");
                        }
                        return [4 /*yield*/, paymentMethod_model_1.default.create(paymentMethod)];
                    case 3:
                        result = _a.sent();
                        status = OK;
                        details = result.toJSON();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
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
    PaymentMethodService.getAllPaymentMethods = function () {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, paymentMethods, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.find()];
                    case 2:
                        paymentMethods = _a.sent();
                        if (!paymentMethods.length) {
                            status = NOT_FOUND;
                            throw new Error("payment methods not found");
                        }
                        status = OK;
                        details = paymentMethods.toString();
                        return [2 /*return*/, {
                                status: status,
                                paymentMethods: paymentMethods
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
    PaymentMethodService.deletePaymentMethod = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, deletedCount, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            status = BAD_REQUEST;
                            throw new Error("invalid id is given");
                        }
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteOne({ _id: id })];
                    case 2:
                        deletedCount = (_a.sent()).deletedCount;
                        if (!deletedCount) {
                            status = NOT_FOUND;
                            throw new Error("Payment Method not found");
                        }
                        status = OK;
                        details = "The item is deleted succeed";
                        return [3 /*break*/, 4];
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
    return PaymentMethodService;
}(generalService_1.default));
exports.default = PaymentMethodService;