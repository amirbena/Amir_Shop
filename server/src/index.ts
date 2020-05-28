
import connection from './db/startup/dbconnection';
import ServerApplication from "./app";
import logger from './startup/logger';
import intializeRoutes from './startup/intialzeRoutes';
import config from 'config'
import { Request, Response } from 'express';
let server;


connection().then(result => {
    const PORT: number = config.get("PORT") || 5000;
    server = new ServerApplication(PORT, intializeRoutes());
    server.app.get("/", (request: Request, response: Response) => {
        response.send('<h1>Amir shop Application</h1>');
    })
    server = server.listen();
}).catch(err => logger.log("error", (err as Error).message));


export default server;