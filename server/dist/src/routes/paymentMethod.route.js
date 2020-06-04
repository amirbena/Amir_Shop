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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbServices_1 = __importDefault(require("../db/startup/dbServices"));
var http_status_codes_1 = require("http-status-codes");
var auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
var admin_middleware_1 = __importDefault(require("./middlewares/admin.middleware"));
var generalRoute_route_1 = __importDefault(require("./generalRoute.route"));
var PaymentMethodService = dbServices_1.default.PaymentMethodService;
var PaymentMethod = /** @class */ (function (_super) {
    __extends(PaymentMethod, _super);
    function PaymentMethod() {
        var _this = _super.call(this) || this;
        _this.getPaymentMethods = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details, beforePaymentMethods, paymentMethods;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, PaymentMethodService.getAllPaymentMethods()];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details, beforePaymentMethods = _a.paymentMethods;
                        if (status !== http_status_codes_1.OK) {
                            return [2 /*return*/, res.status(status).send({
                                    status: status,
                                    details: details
                                })];
                        }
                        paymentMethods = beforePaymentMethods;
                        return [2 /*return*/, res.send({
                                status: status,
                                details: details,
                                paymentMethods: paymentMethods
                            })];
                }
            });
        }); };
        _this.addPaymentMethod = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, PaymentMethodService.addPaymentMethod(req.body.paymentMethod)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        return [2 /*return*/, res.status(status).send({
                                status: status,
                                details: details
                            })];
                }
            });
        }); };
        _this.deletePaymentMethod = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, PaymentMethodService.deletePaymentMethod(req.body.paymentMethod.id)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        return [2 /*return*/, res.status(status).send({
                                status: status,
                                details: details
                            })];
                }
            });
        }); };
        _this.findPaymentMethodbyId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details, paymentMethod;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId(req.body.paymentMethodId)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details, paymentMethod = _a.paymentMethod;
                        if (status !== http_status_codes_1.OK) {
                            return [2 /*return*/, res.status(status).send({
                                    status: status,
                                    details: details
                                })];
                        }
                        return [2 /*return*/, res.send({
                                status: status,
                                details: details,
                                paymentMethod: paymentMethod
                            })];
                }
            });
        }); };
        _this.path = '/paymentMethods';
        _this.intializeRoutes();
        return _this;
    }
    PaymentMethod.prototype.intializeRoutes = function () {
        this.router.get(this.path, [auth_middleware_1.default], this.getPaymentMethods);
        this.router.post(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.addPaymentMethod);
        this.router.delete(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.deletePaymentMethod);
        this.router.get(this.path + "/ id ", [auth_middleware_1.default], this.findPaymentMethodbyId);
    };
    return PaymentMethod;
}(generalRoute_route_1.default));
exports.default = PaymentMethod;
