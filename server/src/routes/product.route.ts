import { Router, Request, Response } from "express";
import Services from "../db/startup/dbServices";
import HTTP_STATUS from '../common/HTTP_Enum';
import authMiddlware from "./middlewares/auth.middleware";
import adminMiddleware from "./middlewares/admin.middleware";
const { ProductService } = Services;

export default class ProductRoute {
    public router = Router();
    public path = "/products";
    intializeRoutes() {
        this.router.post(this.path, [authMiddlware, adminMiddleware]
            , this.addCart);
    }
    constructor() {
        this.intializeRoutes();
    }

    addCart = async (req: Request, res: Response) => {
        const { status, details } = await ProductService.AddProduct(req.body);
        res.status(status).send({
            status,
            details
        })
    }
}