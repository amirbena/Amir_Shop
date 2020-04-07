import express, { Request, Response } from 'express';
import Services from "../db/startup/dbServices";
import HTTP_STATUS from '../common/HTTP_Enum';
import adminMiddleware from './middlewares/admin.middleware';
const { UserService } = Services;
const { NOT_FOUND, OK } = HTTP_STATUS;
export default class UserRoute {
    public router = express.Router();
    private jwtPrivateKey = (process.env.jwtPrivateKey as string);
    public path = "/users";
    constructor() {
        this.intiailzeRoutes()
    }
    private intiailzeRoutes() {
        this.router.get(this.path, [adminMiddleware], this.getUsers);
        this.router.post(`${this.path}/new_user`,this.addUser);
    }

    getUsers = async (req: Request, res: Response) => {
        const users = await UserService.getAllUsers();
        if (!users.length) return res.status(NOT_FOUND).send("<h1> no users into DB</h1>");
        res.send(users);
    }

    addUser = async (req: Request, res: Response) => {
        const { status, details, token } = await UserService.createUser(req.body, this.jwtPrivateKey);
        if (status !== OK) return res.status(status).send(details);
        if(token){
            res.send({
                token,
                details
            })
        }
    }


}

