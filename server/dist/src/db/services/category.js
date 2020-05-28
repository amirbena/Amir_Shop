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
var category_model_1 = __importStar(require("../models/category.model"));
var generalService_1 = __importDefault(require("./generalService"));
var http_status_codes_1 = require("http-status-codes");
var CategoryService = /** @class */ (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryService.addCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, error, insertedCategory, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        error = category_model_1.validateCategory(category).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, category_model_1.default.findOne({ category_name: category.category_name })];
                    case 2:
                        insertedCategory = _a.sent();
                        if (insertedCategory) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("category is found in db");
                        }
                        return [4 /*yield*/, category_model_1.default.create(category)];
                    case 3:
                        insertedCategory = _a.sent();
                        if (!insertedCategory)
                            throw new Error("Something happend when insert db into status");
                        status = http_status_codes_1.OK;
                        details = insertedCategory.toJSON();
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
    CategoryService.getAllCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, category_model_1.default.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CategoryService.getCategoryById = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, _a, statusCheck, detailsCheck, category, categoryAfter, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.findCategoryById(_id)];
                    case 2:
                        _a = _b.sent(), statusCheck = _a.status, detailsCheck = _a.details, category = _a.category;
                        if (statusCheck !== http_status_codes_1.CONTINUE) {
                            status = statusCheck;
                            throw new Error(detailsCheck);
                        }
                        status = http_status_codes_1.OK;
                        categoryAfter = category;
                        details = categoryAfter.toString();
                        return [2 /*return*/, {
                                status: status,
                                details: details,
                                category: category
                            }];
                    case 3:
                        ex_2 = _b.sent();
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
    CategoryService.deleteCategory = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, deletedItem, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!_id) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("_id is null/ undefined ");
                        }
                        return [4 /*yield*/, category_model_1.default.findByIdAndDelete(_id)];
                    case 2:
                        deletedItem = _a.sent();
                        if (!deletedItem) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("item is not found on DB");
                        }
                        status = http_status_codes_1.OK;
                        details = "Succeed delete";
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
    return CategoryService;
}(generalService_1.default));
exports.default = CategoryService;
