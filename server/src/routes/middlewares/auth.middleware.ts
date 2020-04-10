import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import HTTP_STATUS from '../../common/HTTP_Enum';



const { BAD_REQUEST,UNAUTHORIZED } = HTTP_STATUS;



export default function (req: Request, res: Response, next: any) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(UNAUTHORIZED).send('Access denied. No token provided.');
    try {
        const jwtPrivateKey= (process.env.jwtPrivateKey as string);
        const decoded = jwt.verify(token,jwtPrivateKey);
        req.body.user= decoded;
        next();
    }
    catch(ex){
       res.send(BAD_REQUEST).send("Invalid token");
    }
}
