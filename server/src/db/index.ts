import Services from "./startup/dbServices";
import dbConnection from './startup/dbconnection';


const connection = dbConnection();


export default{
    Services,
    connection
}