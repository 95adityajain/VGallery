import redis from "../../commons/client/RedisClient";
import { CONST, USERCONST } from "../../commons/constants/DataConstants";
import Utils from "../../commons/utils";
import _ from "lodash";



const KEY_BASE = Utils.createRedisKey (CONST.REDIS_BASE, USERCONST.BASE);

export default class UserCache {

    static set (email, argsObj) {
        return redis.hmsetAsync (Utils.createRedisKey (KEY_BASE, email), argsObj);
    }

    static get (email) {
        return redis.hgetallAsync (Utils.createRedisKey (KEY_BASE, email)).then ((user) => {
            if (!user && user.email === undefined) {
                throw new Error ();
            }
            return _.mapValues (user, (value) => {
                const newVal = Utils.parseJSON (value);
                return (newVal === false) ? value : newVal;
            });
        });
    }

    static getField (email, fieldName) {
        return redis.hgetAsync (Utils.createRedisKey (KEY_BASE, email), fieldName).then ((value) => {
            const newVal = Utils.parseJSON (value);
            return (newVal === false) ? value : newVal;
        });
    }

    static getMultiField (email, fieldArray) {
        return redis.hmgetAsync (Utils.createRedisKey (KEY_BASE, email), fieldArray).then ((valueArray) => {
            return fieldArray.reduce ((acc, curField, curIndex) => {
                const parsedVal = Utils.parseJSON (valueArray [curIndex]);
                acc [curField] = (parsedVal === false) ? valueArray [curIndex] : parsedVal;
                return acc;
            }, {});
        });
    }

    static removeField (email, fieldName) {
        return redis.hdelAsync (Utils.createRedisKey (KEY_BASE, email), fieldName);
    }

    static remove(email) {
        return redis.hdelAsync (Utils.createRedisKey (KEY_BASE, email));

    }

    static exists (email) {
        return redis.hexistsAsync (Utils.createRedisKey (KEY_BASE, email), USERCONST.FIELD_PASSWORD).then ((result) => {
            return (result && result === 1) ? true : false;
        });
    }
}
