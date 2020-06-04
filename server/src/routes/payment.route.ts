
import { Request, Response } from "express";
import Services from "../db/startup/dbServices";
import { OK } from 'http-status-codes';
import authMiddlware from "./middlewares/auth.middleware";
import adminMiddleware from './middlewares/admin.middleware';
import GeneralRoute from './generalRoute.route';


const { PaymentService } = Services;

export default class PaymentRoute extends GeneralRoute {
    constructor() {
        super();
        this.path = '/payment';
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.post(this.path, [authMiddlware], this.addPayment);
        this.router.get(this.path, [authMiddlware, adminMiddleware], this.getPayments);
        this.router.put(`${this.path}/paymentPaid`, [authMiddlware, adminMiddleware], this.getPayments);
        this.router.delete(this.path, [authMiddlware, adminMiddleware], this.deletePayment);
    }
    addPayment = async (req: Request, res: Response) => {
        const { status, details } = await PaymentService.addPayment(req.body.payment);
        res.status(status).send({
            status,
            details
        })
    }
    getPayments = async (req: Request, res: Response) => {
        const { status, details, payments } = await PaymentService.getPayments();
        if (status !== OK) {
            return res.status(status).send({
                status,
                details
            })
        }
        return res.send({
            status,
            details,
            payments
        })
    }
    paymentPaid = async (req: Request, res: Response) => {
        const { status, details } = await PaymentService.paymentPaid(req.body.paymentId);
        return res.status(status).send({
            status,
            details
        })
    }
    deletePayment = async (req: Request, res: Response) => {
        const { status, details } = await PaymentService.deletePayment(req.body.idToDelete);
        return res.status(status).send({
            status,
            details
        })
    }
}