;
import express, { Router, Request, Response } from 'express';
import Services from "../db/startup/dbServices";
import HTTP_STATUS from '../common/HTTP_Enum';
import authMiddlware from "./middlewares/auth.middleware";
const { CommentService } = Services;
const { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS;


export default class CommentRoute {
    public router = Router();
    private jwtPrivateKey = (process.env.jwtPrivateKey as string);
    public path = "/comments";
    constructor() {
        this.intiailzeRoutes()
    }
    private intiailzeRoutes() {
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