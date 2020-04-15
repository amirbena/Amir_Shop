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
        this.router.put(`${this.path}/ addItem`, [authMiddlware], this.addNewItemToCart);
    }
    createNewCart = async (req: Request, res: Response) => {
        const { status, details } = await CartService.createNewCart(req.body.user.Id);
        res.status(status).send({
            status,
            details
        })
    }
    addNewItemToCart = async (req: Request, res: Response) => {
        const { user, cartDetails } = req.body;
        const {status,details } = await CartService.addItemtoCart(user.Id, cartDetails);
        res.status(status).send({
            status,
            details
        })
    }

}

