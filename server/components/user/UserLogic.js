import UserModel from "./UserModel";
import UserCache from "./UserCache";
import { USERCONST } from "../../commons/constants/DataConstants";
//import ProcessErrorConstants from "../../commons/constants/ErrorConstants";
//import UserConstants from "../../commons/constants/UserConstants";
//import Utils from "../../commons/utils";
//import HashUtils from "../../commons/utils/HashUtils";
//import { OperationalError } from "bluebird";



export default class UserLogic {

    static create (user) {
        const newUser = new UserModel (user);
        return newUser.save ();
    }

    static isEmailExists (email) {
        return UserModel.isEmailExists (email);
    }

    static getField (email, fieldName) {
        return UserModel.getFieldByEmail (email, fieldName);
    }

    static getMultiField (email, fieldArray) {
        const projectionObj = fieldArray.reduce ((acc, curField) => {
            acc [curField] = 1;
            return acc;
        }, {});
        return UserModel.getMultiFieldByEmail (email, projectionObj);
    }

    static setSession (email, sessionId) {
        return UserCache.set (email, {[USERCONST.FIELD_SID]: sessionId});
    }

    static getSession (email) {
        return UserCache.getField (email, USERCONST.FIELD_SID);
    }

    static deleteSession (email) {
        return UserCache.removeField (email, USERCONST.FIELD_SID);
    }

    /*static cache (user) {
        return UserCache.set (user.email, {
            [USERCONST.FIELD_PASSWORD]: user[USERCONST.FIELD_PASSWORD],
            [USERCONST.FIELD_METADATA]: JSON.stringify (user[USERCONST.FIELD_METADATA]),
            [USERCONST.FIELD_PREFERENCES]: JSON.stringify (user[USERCONST.FIELD_PREFERENCES]),
            [USERCONST.FIELD_PROFILE]: JSON.stringify (user[USERCONST.FIELD_PROFILE])
        });
    }*/
}
