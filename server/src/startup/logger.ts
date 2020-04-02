import winston, { ExceptionHandler, createLogger, format, transports } from "winston";

import 'express-async-errors';
const { label, combine, timestamp, prettyPrint } = format;
const logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './error.log', level: 'error' }),
        new transports.File({ filename: './info.log', level: 'info' }),
    ],
    exitOnError: false,
});
export default logger;