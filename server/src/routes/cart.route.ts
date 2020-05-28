import { Request, Response } from "express";
import GeneralRoute from './generalRoute.route'
import Services from "../db/startup/dbServices";
import authMiddlware from "./middlewares/auth.middleware";
import { ICartDetails } from "../db/models/cart.model";

const { CartService } = Services;


export default class CartRoute extends GeneralRoute {
    constructor() {
        super();
        this.path = '/carts';
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.post(this.path, [authMiddlware], this.createNewCart);
        this.router.put(`${this.path}/addItem`, [authMiddlware], this.addNewItemToCart);
        this.router.put(`${this.path}/changeCart`, [authMiddlware], this.changeDetailsForUser);
        this.router.delete(`${this.path}/id`, [authMiddlware], this.deleteCartByid);
        this.router.delete(`${this.path}/byDate`, [authMiddlware], this.deleteSpecificCartbyDate);
        this.router.get(`${this.path}/byDate`, [authMiddlware], this.getCartByUserAndDate);
    }
    createNewCart = async (req: Request, res: Response) => {
        const { id } = req.body.user;
        const { status, details } = await CartService.createNewCart(id);
        return res.status(status).send({
            status,
            details
        })
    }
    addNewItemToCart = async (req: Request, res: Response) => {
        const { cartDetails } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.addItemtoCart(id, (cartDetails as ICartDetails));
        return res.status(status).send({
            status,
            details
        })
    }
    changeDetailsForUser = async (req: Request, res: Response) => {
        const { changedDetails, sign } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.changeElementsforProduct(id, changedDetails as ICartDetails, sign);
        return res.status(status).send({
            status,
            details
        })
    }
    deleteCartByid = async (req: Request, res: Response) => {
        const { status, details } = await CartService.deleteCartById(req.body.cartId);
        return res.status(status).send({
            status,
            details
        })
    }
    deleteSpecificCartbyDate = async (req: Request, res: Response) => {
        const { dateString } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.deleteSpecificCart(id, dateString);
        return res.status(status).send({
            status,
            details
        })
    }
    getCartByUserAndDate = async (req: Request, res: Response) => {
        const { dateString } = req.body;
        const { id } = req.body.user;
        const { status, details } = await CartService.getCartbyUserAndDate(id, dateString);
        return res.status(status).send({
            status,
            details
        })
    }
}

