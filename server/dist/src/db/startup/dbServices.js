"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = __importDefault(require("../services/category"));
var user_1 = __importDefault(require("../services/user"));
var product_1 = __importDefault(require("../services/product"));
var comment_1 = __importDefault(require("../services/comment"));
var paymentMethod_1 = __importDefault(require("../services/paymentMethod"));
var payment_1 = __importDefault(require("../services/payment"));
var cart_1 = __importDefault(require("../services/cart"));
exports.default = {
    CategoryService: category_1.default,
    UserService: user_1.default,
    ProductService: product_1.default,
    CommentService: comment_1.default,
    PaymentMethodService: paymentMethod_1.default,
    PaymentService: payment_1.default,
    CartService: cart_1.default
};
