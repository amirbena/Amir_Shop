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
        this.router.post(`${this.path}/new_user`, this.addUser);
        this.router.get(`${this.path}/login`, this.loginUser);
        this.router.put(`${this.path}/admin`, [adminMiddleware], this.makeUserAdmin);
        this.router.get(`${this.path}/user`, this.getUserById);
        this.router.delete(this.path, [adminMiddleware])
    }

    getUsers = async (req: Request, res: Response) => {
        const users = await UserService.getAllUsers();
        if (!users.length) return res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            details: "<h1> no users into DB</h1>"
        });
        res.send(users);
    }

    addUser = async (req: Request, res: Response) => {
        const { status, details, token } = await UserService.createUser(req.body, this.jwtPrivateKey);
        if (status !== OK) return res.status(status).send({
            details, status
        });
        if (token) {
            return res.send({
                token,
                details
            })
        }
    }
    loginUser = async (req: Request, res: Response) => {
        const { status, details, token } = await UserService.userLogin(req.body, this.jwtPrivateKey);
        if (status !== OK) return res.status(status).send({
            details,
            status
        });
        if (token) {
            return res.send({
                token,
                details
            })
        }
    }
    makeUserAdmin = async (req: Request, res: Response) => {
        const { status, details } = await UserService.makeUserAdmin(req.body.id_will_admin);
        if (status !== OK) return res.status(status).send({
            details,
            status
        });
        return res.send({ details });
    }
    getUserById = async (req: Request, res: Response) => {
        const { status, details } = await UserService.getUserById(req.body.id);
        if (status !== OK) return res.status(status).send({
            details,
            status
        });
    }
    deleteUser = async (req: Request, res: Response) => {
        const { status, details } = await UserService.deleteUser(req.body.deleter_id);
        if (status !== OK) return res.status(status).send({
            details,
            status
        });
        return res.send({ details });
    }

}

