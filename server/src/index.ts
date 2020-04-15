
import connection from './db/startup/dbconnection';
import App from "./app";
import logger from './startup/logger';
import intializeRoutes from './startup/intialzeRoutes';
import { Request, Response } from 'express';
let server;


connection().then(result => {
    const PORT = process.env.PORT || 5000;
    server = new App(PORT as number, intializeRoutes()); /* Need to change it */
    server.app.get("/", (request: Request, response: Response) => {
        response.send('<h1>Amir shop Application</h1>');
    })
    server.listen();
}).catch(err => logger.log("error", (err as Error).message));


export default server;