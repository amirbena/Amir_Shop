import PaymentMethod, { IPaymentMethod, validatePaymentMethod } from "../models/paymentMethod.model";
import { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import GeneralService from "./generalService";



export default class PaymentMethodService extends GeneralService {
    public static async addPaymentMethod(paymentMethod: { paymentMethod: string }): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const { error } = validatePaymentMethod(paymentMethod);
            if (error) {
                status = BAD_REQUEST;
                throw new Error("Invalid input of payment method");
            }
            let result = await PaymentMethod.findOne({ paymentMethod: paymentMethod.paymentMethod });
            if (result) {
                status = BAD_REQUEST;
                throw new Error("has exsiting same payment method");
            }
            result = await PaymentMethod.create(paymentMethod);
            status = OK;
            details = result.toJSON();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async getAllPaymentMethods(): Promise<{ status: number, details?: string, paymentMethods?: IPaymentMethod[] }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const paymentMethods = await PaymentMethod.find();
            status = OK;
            details = paymentMethods.toString();
            return {
                status,
                details,
                paymentMethods
            }
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deletePaymentMethod(id: any): Promise<{ status: number, details: string }> {
        let status: number = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            if (!id) {
                status = BAD_REQUEST;
                throw new Error("invalid id is given");
            }
            const { deletedCount } = await PaymentMethod.deleteOne({ _id: id });
            if (!deletedCount) {
                status = NOT_FOUND;
                throw new Error("Payment Method not found");
            }
            status = OK;
            details = "The item is deleted succeed";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async findPaymentMethodAccordingId(id: any): Promise<{ status: number, details: string, paymentMethod?: IPaymentMethod }> {
        try {
            const { status, details, paymentMethod } = await super.findPaymentMethodAccordingId(id);
            if (status !== CONTINUE) {
                return {
                    status,
                    details
                }
            }
            return {
                status,
                details,
                paymentMethod
            }
        } catch (ex) {
            return {
                status: INTERNAL_SERVER_ERROR,
                details: (ex as Error).message
            }
        }
    }

}