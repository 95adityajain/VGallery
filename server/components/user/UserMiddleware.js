import UserLogic from "./UserLogic";
import Utils from "../../commons/utils";
import UserConstants from "../../commons/constants/UserConstants";
import { USERCONST } from "../../commons/constants/DataConstants";
import { OperationalError } from "bluebird";
import ProcessErrorConstants from "../../commons/constants/ErrorConstants";



const performPreRegistrationChecks = (email) => {
    return UserLogic.isEmailExists (email).then ((result) => {
        return !result;
    });
};

/**
 * POST /user/registrationRequest
 * Middleware for pre registrationRequest checks
 */
export const preRegistrationRequest = (req, res, next) => {
    performPreRegistrationChecks (req.body.user.email).then ((result) => {
        if (!result) {
            return res.status (500).json ({"message":UserConstants.USER_REGISTRATION_EMAIL_ALREADY_EXISTS});
        }
        return next ();
    }).catch ((err) => {
        res.status (500).json ({"message":UserConstants.USER_REGISTRATION_REQUEST_ERROR});
        return Utils.log ("error", UserConstants.USER_REGISTRATION_REQUEST_ERROR +"\n"+err);
    });
};


const performPreLoginChecks = (email) => {
    return UserLogic.getField (email, USERCONST.FIELD_METADATA).then ((metadata) => {
        if (!metadata)
            throw new OperationalError (UserConstants.USER_PRE_LOGIN_EMAIL_NOT_EXISTS_ERROR);
        if (metadata[USERCONST.FIELD_IS_DISABLED])
            throw new OperationalError (UserConstants.USER_PRE_LOGIN_ACCOUNT_DISABLED_ERROR);
        if (!metadata[USERCONST.FIELD_IS_REGISTRATION_PENDING])
            throw new OperationalError (UserConstants.USER_PRE_LOGIN_REGISTRATION_PENDING_ERROR);
        return true;
    });
};


/**
 * POST /login
 * Middleware for pre Login checks
 */
export const preLogin = (req, res, next) => {
    performPreLoginChecks (req.body.email).then (() => {
        return next ();
    }).catch (OperationalError, (err) => {
        res.status (400).json ({"message": err.cause});
        return Utils.log ("error", err.cause);
    }).catch ((err) => {
        res.status (500).json ({"message": ProcessErrorConstants.PROCESSING_ERROR});
        return Utils.log ("error", err);
    });
};


/**
 * "/user/*"
 * Authenticate all secure paths, which require login.
 * needs three query params (sid, ssid, email) with each request
 */
export const authenticateLoggedInUser = (req, res, next) => {
    //TODO: query params authentication
    UserLogic.getSession (req.query.email).then ((sessionId) => {
        if (!sessionId || sessionId != req.query.sid) {
            throw new OperationalError (UserConstants.USER_SESSION_AUTHENTICATION_FAILED_ERROR);
        }
        return next ();
    }).catch (OperationalError, (err) => {
        res.status (400).json ({"message": err.cause});
        return Utils.log ("error", err.cause);
    }).catch ((err) => {
        res.status (500).json ({"message": ProcessErrorConstants.PROCESSING_ERROR});
        return Utils.log ("error", err);
    });
};
