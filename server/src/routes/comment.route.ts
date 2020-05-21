import  {  Request, Response } from 'express';
import Services from "../db/startup/dbServices";
import { OK,  INTERNAL_SERVER_ERROR } from 'http-status-codes';
import GeneralRoute from './generalRoute.route';
import authMiddlware from "./middlewares/auth.middleware";
const { CommentService } = Services;


export default class CommentRoute extends GeneralRoute {
    constructor() {
        super();
        this.path= "/comments";
        this.intiailzeRoutes()
    }
    intiailzeRoutes() {
        this.router.post(this.path, [authMiddlware], this.addComment);
        this.router.get(this.path, this.getComments);
        this.router.put(this.path, [authMiddlware], this.updateComment);
    }
    addComment = async (req: Request, res: Response) => {
        const { status, details } = await CommentService.addComment(req.body);
        if (status !== OK) return res.status(status).send({ details });
        res.send({ details });
    }
    getComments = async (req: Request, res: Response) => {
        try {
            const comments = await CommentService.getComments();
            res.send({
                comments
            })
        } catch (ex) {
            return res.status(INTERNAL_SERVER_ERROR).send({
                details: (ex as Error).message
            })
        }
    }
    updateComment = async (req: Request, res: Response) => {
        const { status, details } = await CommentService.updateComment(req.body.id, req.body);
        if (status !== OK) return res.status(status).send({ details });
        res.send({
            details
        })
    }
    deleteComment = async (req: Request, res: Response) => {
        const { status, details } = await CommentService.deleteComment(req.body.id);
        if (status !== OK) return res.status(status).send({ details });
        res.send({
            details
        })
    }


}