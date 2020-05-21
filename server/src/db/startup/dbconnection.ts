import mongoose from 'mongoose';
import winston from '../../startup/logger';
import configJson from "config";
export default function () {
    const absoultePath: string = configJson.get("DB_PATH");
    winston.info(absoultePath);
    const connection = mongoose.connect(absoultePath, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    connection.then(() => winston.info(`Connected to ${absoultePath} in ${process.env.NODE_ENV} enviroment`))
        .catch(ex => winston.error(`Can't connect  ${(ex as Error).message}`));
    return connection;
}