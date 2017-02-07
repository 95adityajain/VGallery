import UserModel from "./UserModel";
import UserPasswordResetModel from "./UserPasswordResetModel";
import UserContentRequestModel from "./UserContentRequestModel";
import UserCache from "./UserCache";
import { CONST, USERCONST } from "../../commons/constants/DataConstants";
//import ProcessErrorConstants from "../../commons/constants/ErrorConstants";
import UserConstants from "../../commons/constants/UserConstants";
import Utils from "../../commons/utils";
import HashUtils from "../../commons/utils/HashUtils";
import { OperationalError } from "bluebird";
import moment from "moment";



const KEY_BASE = CONST.REDIS_BASE;
const SESSION_KEY_BASE = Utils.createRedisKey (KEY_BASE, USERCONST.FIELD_SID);
const RESET_KEY_BASE = Utils.createRedisKey (KEY_BASE, USERCONST.FIELD_RESET_TOKEN);

export default class UserLogic {

    static create (user) {
        const newUser = new UserModel (user);
        return newUser.save ();
    }

    static getDocument (email) {
        return UserModel.getDocByEmail (email).then ((doc) => {
            return doc;
        });
    }

    static setDocumentFieldValue (doc, fieldName, fieldValue) {
        doc [fieldName] = fieldValue;
    }

    static updateDocument (updatedDoc) {
        return updatedDoc.save ();
    }

    static isEmailExists (email) {
        return UserModel.isEmailExists (email);
    }

    static getField (email, fieldName) {
        return UserModel.getFieldByEmail (email, fieldName);
    }

    static updateField (email, fieldName, fieldValue) {
        return UserModel.updateFieldByEmail (email, fieldName, fieldValue);
    }

    static getMultiField (email, fieldArray) {
        const projectionObj = fieldArray.reduce ((acc, curField) => {
            acc [curField] = 1;
            return acc;
        }, {});
        return UserModel.getMultiFieldByEmail (email, projectionObj);
    }

    static setSession (email, sessionId) {
        return UserCache.setKey (Utils.createRedisKey (SESSION_KEY_BASE, email), sessionId);
    }

    static getSession (email) {
        return UserCache.getKey (Utils.createRedisKey (SESSION_KEY_BASE, email));
    }

    static deleteSession (email) {
        return UserCache.removeKey (Utils.createRedisKey (SESSION_KEY_BASE, email));
    }

    static setResetPasswordToken (email) {
        const resetToken = HashUtils.getRandomString ();
        return UserCache.setKeyWithExpiry (Utils.createRedisKey (RESET_KEY_BASE, email), resetToken, USERCONST.VALUE_RESET_TOKEN_EXPIRY_SECONDS).then ((status) => {
            if (!status) {
                throw new OperationalError (UserConstants.USER_REDIS_SET_ERROR);
            }
            return UserLogic.setResetPasswordTokenforAdminDisplay (email, resetToken);
        });
    }

    static getResetPasswordToken (email) {
        return UserCache.getKey (Utils.createRedisKey (RESET_KEY_BASE, email));
    }

    //As user cannot use mail service from
    static setResetPasswordTokenforAdminDisplay (email, resetToken) {
        const expiresAt = moment ().add (USERCONST.VALUE_RESET_TOKEN_EXPIRY_SECONDS, "s");
        return UserPasswordResetModel.upsertToken (email, resetToken, expiresAt);
    }

    static getResetPasswordListforAdminDisplay () {
        return UserPasswordResetModel.getList ();
    }

    static compareResetPasswordToken (email, resetToken) {
        return UserLogic.getResetPasswordToken (email).then ((storedToken) => {
            if (resetToken != storedToken) {
                throw new OperationalError (UserConstants.USER_RESET_PASSWORD_WRONG_TOKEN);
            }
            return true;
        });
    }

    static generateSession (email) {
        const sid = HashUtils.getRandomString ();
        return UserLogic.setSession (email, sid).then (() => {
            return sid;
        });
    }

    static verifyPassword (email, password) {
        return UserLogic.getField (email, USERCONST.FIELD_PASSWORD).then ((hashedPassword) => {
            return HashUtils.comparePassword (password, hashedPassword);
        }).then ((isValidPassword) => {
            if (!isValidPassword) {
                throw new OperationalError (UserConstants.USER_PASSWORD_NOT_MATCH_ERROR);
            }
            return true;
        });
    }

    static generateAndUpdatePassword (email, newPassword) {
        return HashUtils.generatePassword (newPassword).then ((hashedPassword) => {
            return UserLogic.updateField (email, USERCONST.FIELD_PASSWORD, hashedPassword);
        });
    }

    static createContentRequest (request) {
        const newRequest = new UserContentRequestModel (request);
        return newRequest.save ();
    }

    static getContentRequestList (email) {
        return UserContentRequestModel.getListByEmail (email);
    }

    static getAllContentRequest () {
        return UserContentRequestModel.getList ();
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
