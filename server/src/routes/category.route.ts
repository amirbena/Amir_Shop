import  { Request, Response } from 'express';
import Services from "../db/startup/dbServices";
import { OK,  INTERNAL_SERVER_ERROR } from 'http-status-codes';
import GeneralRoute from './generalRoute.route';
import authMiddlware from "./middlewares/auth.middleware";
import adminMiddleware from "./middlewares/admin.middleware";
const { CategoryService } = Services;

export default class CategroyRoute  extends GeneralRoute{

    constructor() {
        super();
        this.path= "/categories";
        this.intiailzeRoutes();
    }
    private intiailzeRoutes() {
        this.router.post(this.path, [authMiddlware, adminMiddleware], this.addCategory);
        this.router.get(this.path, [authMiddlware, adminMiddleware],this.getCategories);
        this.router.delete(this.path, [authMiddlware, adminMiddleware],this.deleteCategory);
    }

    addCategory = async (req: Request, res: Response) => {
        const { status, details } = await CategoryService.addCategory(req.body.category);
        res.status(status).send({ status, details });
    }

    getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await CategoryService.getAllCategories();
            return res.send({
                status: OK,
                details: categories
            })

        } catch (ex) {
            return res.status(INTERNAL_SERVER_ERROR).send({
                status: INTERNAL_SERVER_ERROR,
                details: (ex as Error).message
            })
        }
    }
    deleteCategory= async (req:Request, res:Response)=>{
        const {status, details}= await CategoryService.deleteCategory(req.body.categoryId);
        res.status(status).send(details);
    }

}