import redis from "redis";
import Promise from "bluebird";

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export default redis;
