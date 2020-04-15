import { Router, IRouter } from "express";


export interface IRouteService {
    router: IRouter;
    path: string;
}
export default class GeneralRoute {
    public router: IRouter;
    public path: string;

    constructor() {
        this.router = Router();
        this.path = "";
    }
}