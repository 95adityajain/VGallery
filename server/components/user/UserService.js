import UserLogic from "./UserLogic";
//import HashUtils from "../../commons/utils/HashUtils";
import Utils from "../../commons/utils";
import UserConstants from "../../commons/constants/UserConstants";
import ProcessErrorConstants from "../../commons/constants/ErrorConstants";
import { USERCONST } from "../../commons/constants/DataConstants";
import { OperationalError } from "bluebird";



/**
 * POST /user/registrationRequest
 * Submits Registration request, for admin to approve.
 */
export const registrationRequest = (req, res) => {
    const user = req.body.user;
    UserLogic.create (user).then (() => {
        res.status (200).json ({"message": UserConstants.USER_REGISTRATION_REQUEST});
        return Utils.log ("info", user);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_REGISTRATION_REQUEST_ERROR});
        return Utils.log ("error", UserConstants.USER_REGISTRATION_REQUEST_ERROR + "\n" + err);
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
    UserLogic.verifyPassword (email, password).then (() => {
        return UserLogic.generateSession (email).then ((sid) => {
            return res.status (200).json ({email, sid});
        });
    }).catch (OperationalError, (err) => {
        res.status (500).json ({"message": err.cause});
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
        return res.status (200).end ();
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_LOGOUT_ERROR});
        return Utils.log ("error", err);
    });
};


/**
 * GET /basicProfile
 * BasicProfile
 */
export const getBasicProfile = (req, res) => {
    const email = req.query.email;
    return UserLogic.getField (email, USERCONST.FIELD_PROFILE).then ((basicProfileObj) => {
        return res.status (200).json (basicProfileObj);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_GET_PROFILE_ERROR});
        return Utils.log ("error", UserConstants.USER_GET_PROFILE_ERROR+"\n"+err);
    });
};


/**
 * GET /preferences
 * Preferences
 */
export const getPreferences = (req, res) => {
    const email = req.query.email;
    return UserLogic.getField (email, USERCONST.FIELD_PREFERENCES).then ((preferencesObj) => {
        return res.status (200).json (preferencesObj);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_GET_PREFERENCES_ERROR});
        return Utils.log ("error", UserConstants.USER_GET_PREFERENCES_ERROR+"\n"+err);
    });
};


export const getContentRequests = (req, res) => {
    const email = req.query.email;
    UserLogic.getContentRequestList (email).then ((list) => {
        return res.status (200).json (list);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_GET_CONTENT_REQUEST_ERROR});
        return Utils.log ("error", UserConstants.USER_GET_CONTENT_REQUEST_ERROR+"\n"+err);
    });
};


/**
* POST /basicProfile
* basicProfile
*/
export const updateBasicProfile = (req, res) => {
    const email = req.query.email;
    const updatedBasicProfile = req.body.basicProfile;
    return UserLogic.updateField (email, USERCONST.FIELD_PROFILE, updatedBasicProfile).then (() => {
        return res.status (200).end ();
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_UPDATE_PROFILE_ERROR});
        return Utils.log ("error", UserConstants.USER_UPDATE_PROFILE_ERROR+"\n"+err);
    });
};


/**
 * POST /preferences
 * Preferences
 */
export const updatePreferences = (req, res) => {
    const email = req.query.email;
    const updatedPreferences = req.body.preferences;
    return UserLogic.updateField (email, USERCONST.FIELD_PREFERENCES, updatedPreferences).then (() => {
        return res.status (200).end ();
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_UPDATE_PREFERENCES_ERROR});
        return Utils.log ("error", UserConstants.USER_UPDATE_PREFERENCES_ERROR+"\n"+err);
    });
};

export const history = (req, res) => {

};

export const updatePassword = (req, res) => {
    const email = req.query.email;
    const newPassword = req.body.new_password;
    UserLogic.generateAndUpdatePassword (email, newPassword).then (() => {
        return res.status (200).end ();
    }).catch (OperationalError, (err) => {
        res.status (500).json ({"message": err.cause});
        return Utils.log ("error", err);
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_UPDATE_PASSWORD_ERROR});
        return Utils.log ("error", err);
    });
};

export const createContentRequest = (req, res) => {
    const contentRequest = req.body.contentRequest;
    UserLogic.createContentRequest (contentRequest).then (() => {
        return res.status (200).end ();
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_CREATE_CONTENT_REQUEST_ERROR});
        return Utils.log ("error", err);
    });
};

export const requestResetPassword = (req, res) => {
    const email = req.params.email;
    UserLogic.setResetPasswordToken (email).then (() => {
        return res.status (200).end ();
    }).catch ((err) => {
        res.status (500).json ({"message": UserConstants.USER_RESET_PASSWORD_REQUEST_ERROR});
        return Utils.log ("error", err);
    });
};


//TODO: (THINK) can delete token after successfull updation of password.
export const resetPassword = (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.new_password;
    UserLogic.generateAndUpdatePassword (email, newPassword).then (() => {
        res.status (200).end ();
    }).catch ((err) => {
        res.status (500).json ({"message": ProcessErrorConstants.PROCESSING_ERROR});
        return Utils.log ("error", err);
    });
};

export const getAllResetPasswordRequest = (req, res) => {
    UserLogic.getResetPasswordListforAdminDisplay ().then ((list) => {
        return res.status (200).json (list);
    }).catch ((err) => {
        res.status (500).json ({"message": ProcessErrorConstants.PROCESSING_ERROR});
        return Utils.log ("error", err);
    });
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
