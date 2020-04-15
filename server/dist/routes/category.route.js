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
var HTTP_Enum_1 = __importDefault(require("../common/HTTP_Enum"));
var generalRoute_route_1 = __importDefault(require("./generalRoute.route"));
var auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
var admin_middleware_1 = __importDefault(require("./middlewares/admin.middleware"));
var CategoryService = dbServices_1.default.CategoryService;
var OK = HTTP_Enum_1.default.OK, INTERNAL_SERVER_ERROR = HTTP_Enum_1.default.INTERNAL_SERVER_ERROR;
var CategroyRoute = /** @class */ (function (_super) {
    __extends(CategroyRoute, _super);
    function CategroyRoute() {
        var _this = _super.call(this) || this;
        _this.addCategory = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, CategoryService.addCategory(req.body.category)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        res.status(status).send({ status: status, details: details });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getCategories = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var categories, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, CategoryService.getAllCategories()];
                    case 1:
                        categories = _a.sent();
                        return [2 /*return*/, res.send({
                                status: OK,
                                details: categories
                            })];
                    case 2:
                        ex_1 = _a.sent();
                        return [2 /*return*/, res.status(INTERNAL_SERVER_ERROR).send({
                                status: INTERNAL_SERVER_ERROR,
                                details: ex_1.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.deleteCategory = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, status, details;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, CategoryService.deleteCategory(req.body.categoryId)];
                    case 1:
                        _a = _b.sent(), status = _a.status, details = _a.details;
                        res.status(status).send(details);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.path = "/categories";
        _this.intiailzeRoutes();
        return _this;
    }
    CategroyRoute.prototype.intiailzeRoutes = function () {
        this.router.post(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.addCategory);
        this.router.get(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.getCategories);
        this.router.delete(this.path, [auth_middleware_1.default, admin_middleware_1.default], this.deleteCategory);
    };
    return CategroyRoute;
}(generalRoute_route_1.default));
exports.default = CategroyRoute;