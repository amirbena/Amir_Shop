import { Types } from 'mongoose';
import Cart, { validateCart, ICart, ICartValidator, ICartDetails } from "../models/cart.model";

import GeneralService from "./generalService";
import { IProduct } from "../models/product.model";
import { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';


export default class CartService extends GeneralService {
    public static async createNewCart(userId: string | Types.ObjectId): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";

        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const object = await Cart.create({ userId });
            status = OK;
            details = object.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async addItemtoCart(userId: any, cartDetails: ICartDetails): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const schema = {
                userId,
                product: cartDetails
            }
            const { error } = validateCart(schema);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            let cart = await Cart.findOne({ userId, date: new Date() });
            if (!cart) {
                status = NOT_FOUND;
                throw new Error("Cart not found");
            }
            const { status: statusProduct, details: detailsProduct, product } = await this.findProductById(cartDetails.productId);
            if (statusProduct !== CONTINUE) {
                status = statusProduct;
                throw new Error(detailsProduct);
            }
            cart.sum += (product as IProduct).price_for_each * cartDetails.amountBuying;
            cart.products.push(cartDetails);
            cart = await cart.save();
            status = OK;
            details = cart.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteAllCartAccordingUser(userId: any): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const { ok, deletedCount } = await Cart.deleteMany({ userId });
            if (!deletedCount) {
                status = NOT_FOUND;
                throw new Error("No Carts found in this user");
            }
            status = OK;
            details = "Succeed delete all carts  that belong that belongs to this user";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async changeElementsforProduct(userId: string, changedDetails: ICartDetails, sign: string): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const schema = {
                userId,
                product: changedDetails
            }
            const { error } = validateCart(schema);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            let cart = await Cart.findOne({ userId, date: new Date() });
            if (!cart) {
                status = NOT_FOUND;
                throw new Error("Cart not found");
            }
            const { status: statusProduct, details: detailsProudct, product } = await this.findProductById(changedDetails.productId);
            if (statusProduct !== OK) {
                status = statusProduct;
                throw new Error(detailsProudct);
            }
            const addToCart = cart.products.find(cartdetail => changedDetails.productId === cartdetail.productId);
            if (!addToCart) {
                status = NOT_FOUND;
                throw new Error("detals not found");
            }
            const index = cart.products.findIndex(cartdetail => changedDetails.productId === cartdetail.productId);
            const changedSum = addToCart.amountBuying * (product as IProduct).price_for_each;
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
            cart = await cart.save();
            status = OK;
            details = cart.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteSpecificCart(userId: string, dateString: string): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        const date = new Date(dateString);
        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const { deletedCount } = await Cart.deleteOne({ userId, date });
            if (!deletedCount) {
                status = NOT_FOUND;
                throw new Error("Can't find current cart");
            }
            status = OK;
            details = "succeed deleting";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteCartById(cartId: string): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { deletedCount } = await Cart.deleteOne({ _id: cartId });
            if (!deletedCount) {
                status = NOT_FOUND;
                throw new Error("cart is not found");
            }
            status = OK;
            details = "cart deleted";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getCartbyUserAndDate(userId: string, dateString: string): Promise<{ status: number, details: string, cart?: ICart }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        const date = new Date(dateString);
        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            let cart = await Cart.findOne({ userId, date });
            if (!cart) {
                status = NOT_FOUND;
                throw new Error("the cart is not found");
            }
            cart = (cart as ICart);
            status = OK;
            details = cart.toJSON();
            return {
                status,
                details,
                cart
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getCartById(cartId: string) {
        let details: string = "";
        try {
            const { status, details: cartDetails, cart } = await this.findCartById(cartId);
            if (status !== OK) {
                return {
                    status,
                    details: cartDetails
                }
            }
            return {
                status: OK,
                details,
                cart: cart as ICart
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
    }
}