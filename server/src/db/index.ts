import Services from "./startup/dbServices";
import dbConnection from './startup/dbconnection';
import winston from 'winston';
let connection;

async function connectDB(){
    try {
        connection= await dbConnection();
    } catch (ex) {
        winston.error((ex as Error).message);
    }
}
connectDB();
export default{
    Services,
    connection
}