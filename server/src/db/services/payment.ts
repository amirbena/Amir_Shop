import Payment, { IPayment, validatePayment, IPaymentValidator } from "../models/payment.model";
import Product from '../models/product.model';
import GeneralService from '../services/generalService';
import { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import CartService from '../services/cart';
import iterableArray from '../../common/iterableArray';
import { ICart, ICartDetails } from "../models/cart.model";


export default class PaymentService extends GeneralService {
    public static async addPayment(payment: IPaymentValidator): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { error } = validatePayment(payment);
            if (error) {
                status = BAD_REQUEST;
                throw new Error(error.details[0].message);
            }
            const { userId, paymentMethodId, cartId } = payment;
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const { status: statusPaymentMethod, details: detailsPaymentMethod } = await this.findUserById(paymentMethodId);
            if (statusPaymentMethod !== CONTINUE) {
                status = statusPaymentMethod;
                throw new Error(detailsPaymentMethod);
            }
            const { status: statusCart, details: detailsCart } = await this.findUserById(cartId);
            if (statusCart !== CONTINUE) {
                status = statusCart;
                throw new Error(detailsCart);
            }
            const result = await Payment.create(payment);
            status = OK;
            details = result.toJSON();
        } catch (ex) {
            details = (ex as Error).message
        }
        return {
            status,
            details
        }
    }
    public static async paymentPaid(paymentId: string) {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const paymentQuerying = await this.findPaymentById(paymentId);
            const { status: statusPayment, details: detailsPayment } = paymentQuerying;
            let { payment } = paymentQuerying;
            if (statusPayment !== CONTINUE) {
                status = statusPayment;
                throw new Error(detailsPayment);
            }
            payment = (payment as IPayment);
            const { status: statusUpdating, details: detailsUpdating } = await this.updateProduct(payment.cartId);
            if (statusUpdating !== CONTINUE) {
                status = statusUpdating;
                throw new Error(` ${detailsUpdating}`);
            }
            const { status: statusCart, details: detailsCart } = await CartService.deleteCartById(payment.cartId);
            if (statusCart !== OK) {
                status = statusCart;
                throw new Error(detailsCart);
            }
            // send user details to array
        } catch (ex) {
            details = (ex as Error).message
        }
        return {
            status,
            details
        }
    }
    public static async getPayments(): Promise<{ status: number, details: string, payments?: IPayment[] }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const payments = await Payment.find();
            status = OK;
            details = payments.toString();
            return {
                status,
                details,
                payments
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deletePayment(id: string): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Bad request");
            }
            const { deletedCount } = await Payment.deleteOne({ _id: id });
            if (!deletedCount) {
                status = NOT_FOUND;
                throw new Error("id is not found into db");
            }
            status = OK;
            details = "Item deleted in succeed";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    private static async updateProduct(cartId: string): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { status: statusCart, details: detailsCart, cart } = await this.findCartById(cartId);
            if (statusCart !== CONTINUE) {
                status = statusCart;
                throw new Error(detailsCart);
            }
            const cartDetailsProducts = (cart as ICart).products;
            const iterableCartDetails= await iterableArray<ICartDetails>(cartDetailsProducts);
            let cartDetail:ICartDetails| undefined;
            for await (cartDetail of iterableCartDetails) {
                const productId = (cartDetail as ICartDetails).productId;
                const product = await Product.findById(productId);
                if (!product) {
                    status = NOT_FOUND;
                    throw new Error("one of products not found into db")
                }
                product.amount -= (cartDetail as ICartDetails).amountBuying;
                await product.save();
            }
            status = CONTINUE;
            details = "succeed to update";
        } catch (ex) {
            details = (ex as Error).message
        }
        return {
            status,
            details
        }
    }

}