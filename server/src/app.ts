import express, { Application } from 'express';
import { IRouteService } from './routes/generalRoute.route';
import logger from './startup/logger';
import cors from "cors";

export default class ServerApplication {
    public app: Application;
    public port: number;
    constructor(port: number, controllers: IRouteService[]) {
        this.app = express();
        this.port = port;
        this.intializeMiddlewares();
        this.intializeControllers(controllers);
    }
    private intializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }
    private intializeControllers(controllers: IRouteService[]) {
        controllers.forEach((controller) => {
            this.app.use(`api${controller.path}`, controller.router);
        })
    }

    public listen() {
        const server = this.app.listen(this.port, () => {
            logger.log("info", `App listens to ${this.port} PORT`);
        });
        return server;
    }

}