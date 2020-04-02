import connection from './db/startup/dbconnection';
import Categrory,{ICategory} from './db/models/category.model';
import User,{IUser} from './db/models/user.model';
import winston from 'winston';



connection();