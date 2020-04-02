import mongoose from 'mongoose';
import winston from 'winston';
import path from "path";
import configJson from "../../common/config.json";
import { config } from 'dotenv';
export default async function () {
    const regularPath: string =configJson.urlForDotEnvs;
    const absoultePath: string = process.env.NODE_ENV === 'test' ? path.join(regularPath,'.test.env') : path.join(regularPath,'.env')
    winston.info(absoultePath);
    config({ path: absoultePath });
    if (typeof process.env.DB_PATH !== 'undefined') {
        try {
            const connection = await mongoose.connect(process.env.DB_PATH,{ useNewUrlParser: true, useUnifiedTopology: true });
            winston.info(`Connected to ${process.env.DB_PATH} in ${process.env.NODE_ENV} enviroment`);
            return connection;
        } catch (ex) {
            winston.error(` Can't connect  ${(ex as Error).message}`);
        }
    }
    winston.error(`Can't connect, please check .env files/ enviromnent variables`);
}