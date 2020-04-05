import PaymentMethod, { IPaymentMethod, validatePaymentMethod } from "../models/paymentMethod.model";
import HTTP_STATUS from "../../common/HTTP_Enum";
import GeneralService from "./generalService";


const { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } = HTTP_STATUS;


export default class PaymentMethodService extends GeneralService {
    public static async addPaymentMethod(paymentMethod: IPaymentMethod): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
            details = result.toString();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async findAllPaymentMethods(): Promise<{ status: HTTP_STATUS, details: string, paymentMethods?: IPaymentMethod[] }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        try {
            const paymentMethods = await PaymentMethod.find();
            if (!paymentMethods.length) {
                status = NOT_FOUND;
                throw new Error("payment methods not found");
            }
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
}