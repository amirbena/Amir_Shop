import Category, { ICategory } from "../models/category.model";
import Product, { IProduct } from "../models/product.model";
import User, { IUser } from "../models/user.model";
import Cart, { ICart } from './../models/cart.model';
import PaymentMethod, { IPaymentMethod } from "../models/paymentMethod.model";
import Payment, { IPayment } from "../models/payment.model";
import Comment, { IComment } from "../models/comment.model";
import HTTP_STATUS from '../../common/HTTP_Enum';

const { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR, CONTINUE } = HTTP_STATUS;
export default class GeneralService {
    protected static async findUserById(id: string): Promise<{ status: HTTP_STATUS, details?: string, user?: IUser }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (id!=='') {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id");
            }
            const user = await User.findById(id);
            if (!user) {
                status = NOT_FOUND;
                throw new Error("user is not found in db");
            }
            status = CONTINUE;
            return {
                status,
                user
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    protected static async findCategoryById(id: string): Promise<{ status: HTTP_STATUS, details?: string, category?: ICategory }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id");
            }
            const category = await Category.findById(id);
            if (!category) {
                status = NOT_FOUND;
                throw new Error("category is not found in db");
            }
            status = CONTINUE;
            return {
                status,
                category
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    protected static async findCartById(id: string): Promise<{ status: HTTP_STATUS, details?: string, cart?: ICart }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id");
            }
            const cart = await Cart.findById(id);
            if (!cart) {
                status = NOT_FOUND;
                throw new Error("product is not found in db");
            }
            status = CONTINUE;
            return {
                status,
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
    protected static async findProductById(id: string): Promise<{ status: HTTP_STATUS, details?: string, product?: IProduct }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id");
            }
            const product = await Product.findById(id);
            if (!product) {
                status = NOT_FOUND;
                throw new Error("product is not found in db");
            }
            status = CONTINUE;
            return {
                status,
                product
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    protected static async findPaymentMethodAccordingId(id: string): Promise<{ status: HTTP_STATUS, details: string, paymentMethod?: IPaymentMethod }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id");
            }
            let paymentMethod = await PaymentMethod.findById(id);
            if (!paymentMethod) {
                status = NOT_FOUND;
                throw new Error("Payment Method not found into db");
            }
            paymentMethod = (paymentMethod as IPaymentMethod);
            details= paymentMethod.toString();
            status = CONTINUE;
            return {
                status,
                details,
                paymentMethod
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details,
        }
    }
    protected static async findCommentById(id: string): Promise<{ status: HTTP_STATUS, details?: string, comment?: IComment }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id")
            }
            const comment = await Comment.findById(id);
            if (!comment) {
                status = NOT_FOUND;
                throw new Error("comment is not found in db");
            }
            status = CONTINUE;
            return {
                status,
                comment
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    protected static async findPaymentById(id: string): Promise<{ status: HTTP_STATUS, details?: string, payment?: IPayment }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("Invalid parameter at id")
            }
            const payment = await Payment.findById(id);
            if (!payment) {
                status = NOT_FOUND;
                throw new Error("payment is not found in db");
            }
            status = CONTINUE;
            return {
                status,
                payment
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
}