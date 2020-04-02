import Cart, { validateCart, ICart, ICartValidator, ICartDetails } from "../models/cart.model";
import HTTP_STATUS from "../../common/HTTP_Enum";
import GeneralService from "./generalService";


const { OK, INTERNAL_SERVER_ERROR, CONTINUE, BAD_REQUEST, NOT_FOUND } = HTTP_STATUS;

export default class CartService extends GeneralService {
    public static async createNewCart(userId: string): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";

        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const object = await Cart.create({ userId });
            status = OK;
            details = object.toString();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
}