
import connection from './db/startup/dbconnection';
import App from "./app";
import logger from './startup/logger'
import {  Request, Response } from 'express';
let server;


connection().then(result=>{
    server= new App(5000,[]); /* Need to change it */
    server.app.get("/",(request:Request ,response: Response)=>{
        response.send('<h1>Amir shop Application</h1>');
    })
    server.listen();
}).catch(err=>logger.log("error",(err as Error).message));


export default server;