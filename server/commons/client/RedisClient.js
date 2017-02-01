import redis from "../promisify/RedisPromise";
import config from "../../config";
import Utils from "../utils";
import ProcessErrorConstants from "../constants/ErrorConstants";



const redisClient = redis.createClient (config.redis);

redisClient.on ("error", (err) => {
    Utils.log ("error", ProcessErrorConstants.REDIS_ERROR + "\n" + err);
});

//TODO: add error handling for severe errors.



export default redisClient;
