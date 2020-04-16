"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_route_1 = __importDefault(require("../routes/user.route"));
var category_route_1 = __importDefault(require("../routes/category.route"));
var product_route_1 = __importDefault(require("../routes/product.route"));
var comment_route_1 = __importDefault(require("../routes/comment.route"));
var cart_route_1 = __importDefault(require("../routes/cart.route"));
var paymentMethod_route_1 = __importDefault(require("../routes/paymentMethod.route"));
var payment_route_1 = __importDefault(require("../routes/payment.route"));
function default_1() {
    var array = [];
    array.push(new user_route_1.default());
    array.push(new category_route_1.default());
    array.push(new product_route_1.default());
    array.push(new comment_route_1.default());
    array.push(new cart_route_1.default());
    array.push(new paymentMethod_route_1.default());
    array.push(new payment_route_1.default());
    return array;
}
exports.default = default_1;
