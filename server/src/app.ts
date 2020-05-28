import express, { Application } from 'express';
import bodyParser from 'body-parser';
import {IRouteService} from './routes/generalRoute.route';
import logger from './startup/logger';


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
        this.app.use(bodyParser.json());
    }
    private intializeControllers(controllers: IRouteService[]) {
        controllers.forEach((controller) => {
            this.app.use(`api${controller.path}`, controller.router);
        })
    }

    public listen() {
        const server= this.app.listen(this.port, () => {
            logger.log("info", `App listens to ${this.port} PORT`);
        });
        return server;
    }

}