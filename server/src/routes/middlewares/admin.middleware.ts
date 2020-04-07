import {Request, Response} from 'express';
import HTTP_Enum from '../../common/HTTP_Enum';
const {FORBIDDEN}=HTTP_Enum;
export default function(req: Request, res:Response, next:any  ){
    if(!req.body.user.isAdmin) return res.status(FORBIDDEN).send("Access denied");
    next();
}