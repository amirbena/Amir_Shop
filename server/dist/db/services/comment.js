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
var comment_model_1 = __importStar(require("../models/comment.model"));
var generalService_1 = __importDefault(require("./generalService"));
var http_status_codes_1 = require("http-status-codes");
var CommentService = /** @class */ (function (_super) {
    __extends(CommentService, _super);
    function CommentService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentService.addComment = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, error, commentAdded, _a, statusProduct, detailsProduct, _b, statusUser, detailsUser, ex_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.INTERNAL_SERVER_ERROR;
                        details = "";
                        error = comment_model_1.validateComment(comment).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            details = error.details[0].message;
                            return [2 /*return*/, {
                                    status: status,
                                    details: details
                                }];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        error = comment_model_1.validateComment(comment).error;
                        if (error) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error(error.details[0].message);
                        }
                        return [4 /*yield*/, comment_model_1.default.findOne({
                                title: comment.title,
                                comment: comment.comment
                            })];
                    case 2:
                        commentAdded = _c.sent();
                        if (commentAdded) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("the comment is exist in db");
                        }
                        return [4 /*yield*/, this.findProductById(comment.product_id)];
                    case 3:
                        _a = _c.sent(), statusProduct = _a.status, detailsProduct = _a.details;
                        if (statusProduct !== http_status_codes_1.CONTINUE) {
                            status = statusProduct;
                            throw new Error(detailsProduct);
                        }
                        return [4 /*yield*/, this.findUserById(comment.user_id)];
                    case 4:
                        _b = _c.sent(), statusUser = _b.status, detailsUser = _b.details;
                        if (statusUser !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        return [4 /*yield*/, comment_model_1.default.create(comment)];
                    case 5:
                        commentAdded = _c.sent();
                        status = http_status_codes_1.OK;
                        details = commentAdded.toJSON();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _c.sent();
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
    CommentService.getDetailedComment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, comment, _a, statusProduct, detailsProduct, product, _b, statusUser, detailsUser, user, detailedComment, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        status = http_status_codes_1.NOT_FOUND;
                        details = "";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (!id) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("id is invalid");
                        }
                        return [4 /*yield*/, comment_model_1.default.findById(id)];
                    case 2:
                        comment = _c.sent();
                        if (!comment) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("comment is not found into db");
                        }
                        return [4 /*yield*/, this.findProductById(comment.product_id)];
                    case 3:
                        _a = _c.sent(), statusProduct = _a.status, detailsProduct = _a.details, product = _a.product;
                        if (statusProduct !== http_status_codes_1.CONTINUE) {
                            status = statusProduct;
                            throw new Error(detailsProduct);
                        }
                        return [4 /*yield*/, this.findUserById(comment.user_id)];
                    case 4:
                        _b = _c.sent(), statusUser = _b.status, detailsUser = _b.details, user = _b.user;
                        if (statusProduct !== http_status_codes_1.CONTINUE) {
                            status = statusUser;
                            throw new Error(detailsUser);
                        }
                        detailedComment = {
                            id: comment.id,
                            user: user,
                            product: product,
                            title: comment.title,
                            comment: comment.comment,
                            rank: comment.rank
                        };
                        status = http_status_codes_1.OK;
                        return [2 /*return*/, {
                                status: status,
                                detailedComment: detailedComment
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
    CommentService.updateComment = function (id, detailsToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, comment, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.NOT_FOUND;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("id is invalid");
                        }
                        return [4 /*yield*/, comment_model_1.default.findByIdAndUpdate(id, detailsToUpdate)];
                    case 2:
                        comment = _a.sent();
                        if (!comment) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("comment is not found");
                        }
                        status = http_status_codes_1.OK;
                        details = "Object updated";
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
    CommentService.deleteComment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var status, details, comment, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = http_status_codes_1.NOT_FOUND;
                        details = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (!id) {
                            status = http_status_codes_1.BAD_REQUEST;
                            throw new Error("id is invalid");
                        }
                        return [4 /*yield*/, comment_model_1.default.findByIdAndDelete(id)];
                    case 2:
                        comment = _a.sent();
                        if (!comment) {
                            status = http_status_codes_1.NOT_FOUND;
                            throw new Error("comment is not found");
                        }
                        status = http_status_codes_1.OK;
                        details = "Comment deleted";
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
    CommentService.getComments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comments, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, comment_model_1.default.find({})];
                    case 1:
                        comments = _a.sent();
                        return [2 /*return*/, {
                                status: http_status_codes_1.OK,
                                comments: comments
                            }];
                    case 2:
                        ex_5 = _a.sent();
                        return [2 /*return*/, { status: http_status_codes_1.INTERNAL_SERVER_ERROR }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CommentService;
}(generalService_1.default));
exports.default = CommentService;
