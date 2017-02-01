import _ from "lodash";
import logger from "../../logger";

export default class Utils {
    static parseJSON (jsonString) {
        const parsedObj = _.attempt(JSON.parse.bind(null, jsonString)); // returns Error obj if not json
        if (parsedObj instanceof Error) {
            return false;
        }
        return parsedObj;
    }

    static sendHttpJsonResponse (res, data) {
        if (data.log) {
            this.log (data.log.type, data.log.message);
        }
        res.status (data.status).json (data.json);
    }

    static log (type, msg) {
        logger.log (type, msg);
    }

    static requestLogger (req, res, next) {
        Utils.log ("info", JSON.stringify (_.pick (req, ["protocol", "url", "method", "query", "params", "body"])));
        next ();
    }

    static createRedisKey (...args) {
        return _.join (args, ":");
    }

    static createHmsetArgsArray (argsObject) {
        return _.transform (argsObject, (acc, value, key) => {
            acc.push (key);
            acc.push (value);
        }, []);
    }
}
