import { Router, Request, Response } from "express";
import Services from "../db/startup/dbServices";
import authMiddlware from "./middlewares/auth.middleware";
import adminMiddleware from "./middlewares/admin.middleware";
import HTTP_STATUS from "../common/HTTP_Enum";
const { CartService } = Services;


export default class CartRoute {
    public router = Router();
    public path = '/carts';
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, [authMiddlware], this.createNewCart);
        this.router.put(`${this.path}/addItem`, [authMiddlware], this.addNewItemToCart);
        this.router.put(`${this.path}/changeCart`, [authMiddlware], this.changeDetailsForUser);
        this.router.delete(`${this.path}/id`, [authMiddlware], this.deleteCartByid);
        this.router.delete(`${this.path}/byDate`, [authMiddlware], this.deleteSpecificCartbyDate);
    }
    createNewCart = async (req: Request, res: Response) => {
        const { id } = req.body.user;
        const { status, details } = await CartService.createNewCart(id);
        res.status(status).send({
            status,
            details
        })
    }
    addNewItemToCart = async (req: Request, res: Response) => {
        const { cartDetails } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.addItemtoCart(id, cartDetails);
        res.status(status).send({
            status,
            details
        })
    }
    changeDetailsForUser = async (req: Request, res: Response) => {
        const { changedDetails, sign } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.changeElementsforProduct(id, changedDetails, sign);
        res.status(status).send({
            status,
            details
        })
    }
    deleteCartByid = async (req: Request, res: Response) => {
        const { status, details } = await CartService.deleteCartById(req.body.cartId);
        res.status(status).send({
            status,
            details
        })
    }
    deleteSpecificCartbyDate = async (req: Request, res: Response) => {
        const { dateString } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.deleteSpecificCart(id, dateString);
        res.status(status).send({
            status,
            details
        })
    }
}

