import UserModel from "./UserModel";
import UserCache from "./UserCache";
import { USERCONST } from "../../commons/constants/DataConstants";
//import ProcessErrorConstants from "../../commons/constants/ErrorConstants";
import UserConstants from "../../commons/constants/UserConstants";
import Utils from "../../commons/utils";
//import HashUtils from "../../commons/utils/HashUtils";
//import { OperationalError } from "bluebird";



export default class UserLogic {

    static create (user) {
        const newUser = new UserModel (user);
        return newUser.save ().then (() => {
            UserLogic.cache (newUser).catch ((err) => { // do not fail fast, if not stored in cache.
                Utils.log ("error", UserConstants.USER_REDIS_SET_ERROR + "\n" + err);
            });
            //return newUser.toObject ();
        });
    }

    static isEmailExists (email) {
        //can use cache email exists method
        return UserModel.isEmailExists (email);
    }

    static getField (email, fieldName) {
        return UserCache.getField (email, fieldName).then ((value) => {
            if (!value) {
                Utils.log ("warn", UserConstants.USER_CACHE_FAILED+"\n"+email+" "+fieldName);
                return UserModel.getFieldByEmail (email, fieldName);
            }
            return value;
        }).catch ((err) => {
            Utils.log ("warn", UserConstants.USER_CACHE_FAILED+"\n"+email+" "+fieldName+"\n"+err);
            return UserModel.getFieldByEmail (email, fieldName);
        });
    }

    static getMultiField (email, fieldArray) {
        return UserCache.getMultiField (email, fieldArray).catch ((err) => {
            Utils.log ("warn", UserConstants.USER_CACHE_FAILED+"\n"+email+" "+fieldArray+"\n"+err);
            const projectionObj = fieldArray.reduce ((acc, curField) => {
                acc [curField] = 1;
                return acc;
            }, {});
            return UserModel.getMultiFieldByEmail (email, projectionObj);
        });
    }

    static setSession (email, sessionObject) {
        return UserCache.set (email, {[USERCONST.FIELD_AUTH]: JSON.stringify (sessionObject)});
    }

    static getSession (email) {
        return UserCache.getField (email, USERCONST.FIELD_AUTH);
    }

    static deleteSession (email) {
        return UserCache.removeField (email, USERCONST.FIELD_AUTH);
    }

    static cache (user) {
        return UserCache.set (user.email, {
            [USERCONST.FIELD_PASSWORD]: user[USERCONST.FIELD_PASSWORD],
            [USERCONST.FIELD_METADATA]: JSON.stringify (user[USERCONST.FIELD_METADATA]),
            [USERCONST.FIELD_PREFERENCES]: JSON.stringify (user[USERCONST.FIELD_PREFERENCES]),
            [USERCONST.FIELD_PROFILE]: JSON.stringify (user[USERCONST.FIELD_PROFILE])
        });
    }
}
