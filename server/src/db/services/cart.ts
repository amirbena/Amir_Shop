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
    public static async addItemtoCart(userId: string, cartDetails: ICartDetails): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
            cart.products.push(cartDetails);
            cart = await cart.save();
            status = OK;
            details = cart.toString();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteAllCartAccordingUser(userId: string): Promise<{ status: HTTP_STATUS, details: string }> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
    public static async changeElementsforproduct(userId: string, cartDetails: ICartDetails,sign :string ): Promise<{status:HTTP_STATUS, details:string}> {
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
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
            const detailsToDrop = cart.products.find(cartdetail => cartDetails.productId === cartdetail.productId);
            if (!detailsToDrop) {
                status = NOT_FOUND;
                throw new Error("detals not found");
            }
            const index=cart.products.findIndex(cartdetail => cartDetails.productId === cartdetail.productId);
            if(sign === "-"){
                detailsToDrop.amountBuying -= cartDetails.amountBuying;
            }
            else{
                if(sign ==="+"){
                    detailsToDrop.amountBuying += cartDetails.amountBuying;
                }
            }
            cart.products[index]= detailsToDrop;
            cart = await cart.save();
            status = OK;
            details = cart.toString();
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
    public static async deleteSpecificCart(userId: string, dateString: string): Promise<{status:HTTP_STATUS, details:string}>{
        let status: HTTP_STATUS = INTERNAL_SERVER_ERROR;
        let details: string = "";
        const date=new Date(dateString);
        try {
            const { status: statusUser, details: detailsUser } = await this.findUserById(userId);
            if (statusUser !== CONTINUE) {
                status = statusUser;
                throw new Error(detailsUser);
            }
            const {ok,deletedCount}=await Cart.deleteOne({userId,date});
            if(!deletedCount){
                status=NOT_FOUND;
                throw new Error("Can't find current cart");
            }
            status=OK;
            details= "suceed deleting";
        } catch (ex) {
            details = (ex as Error).message;
        }
        return {
            status,
            details
        }
    }
}