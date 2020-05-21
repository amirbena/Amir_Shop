import {Request, Response} from 'express';
import {FORBIDDEN} from 'http-status-codes';
export default function(req: Request, res:Response, next:any  ){
    if(!req.body.user.isAdmin) return res.status(FORBIDDEN).send("Access denied");
    next();
}