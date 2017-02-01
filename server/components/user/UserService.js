import UserLogic from "./UserLogic";
import HashUtils from "../../commons/utils/HashUtils";
import Utils from "../../commons/utils";
import UserConstants from "../../commons/constants/UserConstants";
//import ProcessErrorConstants from "../../commons/constants/ErrorConstants";
import { USERCONST } from "../../commons/constants/DataConstants";
import { OperationalError } from "bluebird";



const submitRegistrationRequest = (user) => {
    return  UserLogic.save (user).then ((newUser) => {
        UserLogic.cache (newUser).catch ((err) => { // do not fail fast, if not stored in cache.
            Utils.log ("error", UserConstants.USER_REDIS_SET_ERROR + "\n" + err);
        });
    });
};

/**
 * POST /user/registrationRequest
 * Submits Registration request, for admin to approve.
 */
export const registrationRequest = (req, res) => {
    const user = req.body.user;
    submitRegistrationRequest (user).then (() => {
        res.status (200).json ({"message": UserConstants.USER_REGISTRATION_REQUEST});
        return Utils.log ("info", user);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_REGISTRATION_REQUEST_ERROR});
        return Utils.log ("error", UserConstants.USER_REGISTRATION_REQUEST_ERROR + "\n" + err);
    });
};


const performLogin = (email, password) => {
    return UserLogic.getField (email, USERCONST.FIELD_PASSWORD).then ((hashedPassword) => {
        return HashUtils.compareHash (password, hashedPassword);
    }).then ((isValidPassword) => {
        if (!isValidPassword)
            throw new OperationalError (UserConstants.USER_LOGIN_PASSWORD_NOT_MATCH_ERROR);
        return true;
    });
};

/**
 * POST /login
 * Login
 * @body    {
 *              "username": <String>,
 *              "email": <String>
 *          }
 */
//THINK: If users login again, either create new sessionIDS or return old if present,
//currently doing: return new session-Id's
export const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    performLogin (email, password).then (() => {
        const authObj = {
            [USERCONST.FIELD_SID]: HashUtils.getRandomString (),
            [USERCONST.FIELD_SSID]: HashUtils.getRandomString ()
        };
        UserLogic.setSession (email, authObj).then (() => {
            authObj.email = email;
            res.status (200).json (authObj);
        });
    }).catch (OperationalError, (err) => {
        res.status (500).json ({"message": err});
        return Utils.log ("error", err);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_LOGIN_ERROR});
        return Utils.log ("error", err);
    });
};


/**
 * GET /logout
 * Logout
 */
export const logout = (req, res) => {
    const email = req.query.email;
    UserLogic.deleteSession (email).then (() => {
        res.status (200).json ({});
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_LOGOUT_ERROR});
        return Utils.log ("error", err);
    });
};


/**
 * GET /basicProfile
 * BasicProfile
 */
export const basicProfile = (req, res) => {
    const email = req.query.email;
    return UserLogic.getField (email, USERCONST.FIELD_PROFILE).then ((basicProfileObj) => {
        res.status (200).json (basicProfileObj);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_GET_PROFILE_ERROR});
        return Utils.log ("error", UserConstants.USER_GET_PROFILE_ERROR+"\n"+err);
    });
};


/**
 * GET /preferences
 * Preferences
 */
export const preferences = (req, res) => {
    const email = req.query.email;
    return UserLogic.getField (email, USERCONST.FIELD_PREFERENCES).then ((preferencesObj) => {
        res.status (200).json (preferencesObj);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_GET_PREFERENCES_ERROR});
        return Utils.log ("error", UserConstants.USER_GET_PREFERENCES_ERROR+"\n"+err);
    });
};

export const history = (req, res) => {

};

export const changePassword = (req, res) => {

};

export const forgetPassword = (req, res) => {

};

export const resetPasswordDisplay = (req, res) => {

};

export const resetPassword = (req, res) => {

};

export const requestContent = (req, res) => {

};

export const requestAccess = (req, res) => {

};



export const disableUser = (req, res) => {

};

export const upsertPermission = (req, res) => {

};

export const getContentRequest = (req, res) => {

};

export const getAccessRequest = (req, res) => {

};
