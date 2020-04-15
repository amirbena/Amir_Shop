import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { IService } from './startup/intialzeRoutes';
import logger from './startup/logger';


export default class App {
    public app: Application;
    public port: number;
    constructor(port: number, controllers: IService[]) {
        this.app = express();
        this.port = port;
        this.intializeMiddlewares();
        this.intializeControllers(controllers);
    }
    private intializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
    private intializeControllers(controllers: IService[]) {
        controllers.forEach((controller) => {
            this.app.use(`api${controller.path}`, controller.router);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.log("info", `App listens to ${this.port} PORT`);
        });
    }

}