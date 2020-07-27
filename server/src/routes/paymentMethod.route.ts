import { IPaymentMethod } from './../db/models/paymentMethod.model';
import { Request, Response } from "express";
import Services from "../db/startup/dbServices";
import { OK } from 'http-status-codes';
import authMiddlware from "./middlewares/auth.middleware";
import adminMiddleware from './middlewares/admin.middleware';
import GeneralRoute from './generalRoute.route';

const { PaymentMethodService } = Services;
export default class PaymentMethod extends GeneralRoute {
    constructor() {
        super();
        this.path = '/paymentMethods';
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.get(this.path, [authMiddlware], this.getPaymentMethods);
        this.router.post(this.path, [authMiddlware, adminMiddleware], this.addPaymentMethod);
        this.router.delete(this.path, [authMiddlware, adminMiddleware], this.deletePaymentMethod);
        this.router.get(`${this.path}/ id `, [authMiddlware], this.findPaymentMethodbyId);
    }
    getPaymentMethods = async (req: Request, res: Response) => {
        const { status, details, paymentMethods: beforePaymentMethods } = await PaymentMethodService.getAllPaymentMethods();
        if (status !== OK) {
            return res.status(status).send({
                status,
                details
            })
        }
        const paymentMethods = (beforePaymentMethods as IPaymentMethod[]);
        return res.send({
            status,
            details,
            paymentMethods
        })
    }
    addPaymentMethod = async (req: Request, res: Response) => {
        const { status, details } = await PaymentMethodService.addPaymentMethod(req.body.paymentMethod);
        return res.status(status).send({
            status,
            details
        })
    }
    deletePaymentMethod = async (req: Request, res: Response) => {
        const { status, details } = await PaymentMethodService.deletePaymentMethod(req.body.paymentMethod.id);
        return res.status(status).send({
            status,
            details
        })
    }
    findPaymentMethodbyId = async (req: Request, res: Response) => {
        const { status, details, paymentMethod } = await PaymentMethodService.findPaymentMethodAccordingId(req.body.paymentMethodId);
        if (status !== OK) {
            return res.status(status).send({
                status,
                details
            })
        }
        return res.send({
            status,
            details,
            paymentMethod
        })
    }
}