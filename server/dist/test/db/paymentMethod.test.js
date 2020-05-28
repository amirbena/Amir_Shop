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
var paymentMethod_model_1 = __importDefault(require("../../db/models/paymentMethod.model"));
var mochaAsync_1 = __importDefault(require("../mochaAsync"));
var chai_1 = require("chai");
var mongoose_1 = require("mongoose");
var http_status_codes_1 = require("http-status-codes");
var index_1 = __importDefault(require("../../db/index"));
var PaymentMethodService = index_1.default.Services.PaymentMethodService;
mocha_1.describe("Payment Method Service Check", function () {
    mocha_1.describe("POST/: ", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Credit Card"
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Cash"
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("Should return BAD_REQUEST when input invalid", function () { return __awaiter(_this, void 0, void 0, function () {
            var paymentMethodReturned, paymentMethod, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        paymentMethod = {
                            paymentMethod: "ab"
                        };
                        return [4 /*yield*/, PaymentMethodService.addPaymentMethod(paymentMethod)];
                    case 1:
                        paymentMethodReturned = _a.sent();
                        chai_1.expect(paymentMethodReturned.status).to.be.eqls(http_status_codes_1.BAD_REQUEST);
                        paymentMethod.paymentMethod = "";
                        return [4 /*yield*/, PaymentMethodService.addPaymentMethod(paymentMethod)];
                    case 2:
                        paymentMethodReturned = _a.sent();
                        chai_1.expect(paymentMethodReturned.status).to.be.eqls(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should return BAD_REQUEST when input is exist in DB", function () { return __awaiter(_this, void 0, void 0, function () {
            var paymentMethod, status, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paymentMethod = {
                            paymentMethod: "Credit Card"
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PaymentMethodService.addPaymentMethod(paymentMethod)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should return OK status, and json of details", function () { return __awaiter(_this, void 0, void 0, function () {
            var paymentMethod, _a, status, details, ex_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        paymentMethod = {
                            paymentMethod: "Paypal"
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PaymentMethodService.addPaymentMethod(paymentMethod)];
                    case 2:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(details).to.haveOwnProperty("paymentMethod", "Paypal");
                        return [3 /*break*/, 4];
                    case 3:
                        ex_5 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe("GET/:", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Credit Card"
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Cash"
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_6 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_7 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it('should return array with 0 elements', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, paymentMethods, ex_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteMany({})];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, PaymentMethodService.getAllPaymentMethods()];
                    case 2:
                        _a = _b.sent(), status = _a.status, paymentMethods = _a.paymentMethods;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(paymentMethods).length(0);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_8 = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should return array with 2 elements", function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, paymentMethods, ex_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PaymentMethodService.getAllPaymentMethods()];
                    case 1:
                        _a = _b.sent(), status = _a.status, paymentMethods = _a.paymentMethods;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        chai_1.expect(paymentMethods).length(2);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_9 = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    mocha_1.describe("DELETE/: ", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Credit Card"
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Cash"
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_10 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_11 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return NOT_FOUND  when id is not found into DB", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = mongoose_1.Types.ObjectId();
                        return [4 /*yield*/, PaymentMethodService.deletePaymentMethod(id)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return OK , and delete Cash Method from DB", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var paymentMethod, id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, paymentMethod_model_1.default.findOne({ paymentMethod: "Cash" })];
                    case 1:
                        paymentMethod = _a.sent();
<<<<<<< HEAD
                        id = paymentMethod._id;
                        return [4 /*yield*/, PaymentMethodService.deletePaymentMethod(id)];
                    case 2:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        return [2 /*return*/];
                }
            });
        }); }));
    });
    mocha_1.describe("GET /:id", function () {
        mocha_1.beforeEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Credit Card"
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Cash"
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
=======
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.deletePaymentMethod({})];
                    case 2:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.deletePaymentMethod([])];
                    case 3:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.deletePaymentMethod(null)];
                    case 4:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.deletePaymentMethod(undefined)];
                    case 5:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 7];
                    case 6:
>>>>>>> origin/RoutesFeature
                        ex_12 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.afterEach(mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteMany({})];
                    case 1:
<<<<<<< HEAD
                        _a.sent();
=======
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
>>>>>>> origin/RoutesFeature
                        return [3 /*break*/, 3];
                    case 2:
                        ex_13 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }));
        mocha_1.it("should return NOT_FOUND status when id is not found into db", mochaAsync_1.default(function () { return __awaiter(_this, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = mongoose_1.Types.ObjectId();
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId(id)];
                    case 1:
                        status = (_a.sent()).status;
<<<<<<< HEAD
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [2 /*return*/];
=======
                        chai_1.expect(status).to.be.equal(http_status_codes_1.OK);
                        return [3 /*break*/, 4];
                    case 3:
                        ex_14 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
>>>>>>> origin/RoutesFeature
                }
            });
        }); }));
    });
    mocha_1.describe("GET /:id", function () {
        mocha_1.beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Credit Card"
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, paymentMethod_model_1.default.create({
                                paymentMethod: "Cash"
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_15 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, paymentMethod_model_1.default.deleteMany({})];
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
        mocha_1.it("should return BAD_REQUEST if id is invalid", function () { return __awaiter(_this, void 0, void 0, function () {
            var paymentMethod, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        paymentMethod = void 0;
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId(null)];
                    case 1:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId(undefined)];
                    case 2:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId("")];
                    case 3:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId({})];
                    case 4:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId([])];
                    case 5:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId(1)];
                    case 6:
                        paymentMethod = _a.sent();
                        chai_1.expect(paymentMethod.status).to.be.equal(http_status_codes_1.BAD_REQUEST);
                        return [3 /*break*/, 8];
                    case 7:
                        ex_17 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        mocha_1.it("should return NOT_FOUND status when id is not found into db", function () { return __awaiter(_this, void 0, void 0, function () {
            var id, status, ex_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = mongoose_1.Types.ObjectId();
                        return [4 /*yield*/, PaymentMethodService.findPaymentMethodAccordingId(id)];
                    case 1:
                        status = (_a.sent()).status;
                        chai_1.expect(status).to.be.equal(http_status_codes_1.NOT_FOUND);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_18 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
