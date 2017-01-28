import winston from "winston";
//import config from "./config";

const logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)()
    ]
});

logger.cli();

export default logger;
