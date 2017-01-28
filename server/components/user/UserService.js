import UserModel from "./UserModel";
import logger from "../../logger";
import HashUtils from "../../commons/utils/HashUtils";
import UserConstants from "../../commons/constants/UserConstants";
import ProcessErrorConstants from "../../commons/constants/ErrorConstants";
/**
 * POST /user/registrationRequest
 * Middleware for pre registrationRequest checks
 */
export const preRegistrationRequest = (req, res, next) => {
    UserModel.getUserObjByEmail (req.body.user.email)
    .then ((existingUser) => {
        if (existingUser && existingUser.email !== undefined) {
            return res.status (500).json ({"message":UserConstants.USER_REGISTRATION_EMAIL_ALREADY_EXISTS});
        }
        next ();
    })
    .catch ((err) => {
        logger.error (err.toString ());
        res.status (500).json ({"message":UserConstants.USER_REGISTRATION_REQUEST_ERROR});
    });
};

/**
 * POST /user/registrationRequest
 * Submits Registration request, for admin to approve.
 */
export const registrationRequest = (req, res) => {
    let newUser = new UserModel (req.body.user);
    newUser.save ()
    .then (() => {
        logger.info (req.body.user);
        res.status (200).json ({"message": UserConstants.USER_REGISTRATION_REQUEST});
    }).catch ((err) => {
        logger.error (err.toString ());
        res.status (500).json ({"message":UserConstants.USER_REGISTRATION_REQUEST_ERROR});
    });
};
/**
 * POST /login
 * Middleware for pre Login checks
 */
export const preLogin = (req, res, next) => {
    UserModel.getUserObjByEmail (req.body.email)
    .then ((existingUser) => {
        if (!existingUser) {
            return res.status (400).json ({"message": UserConstants.USER_PRE_LOGIN_EMAIL_NOT_EXISTS_ERROR});
        }
        if (existingUser.isDisabled) {
            return res.status (400).json ({"message": UserConstants.USER_PRE_LOGIN_ACCOUNT_DISABLED_ERROR});
        }
        if (existingUser.isRegistrationRequestPending) {
            return res.status (200).json ({"message": UserConstants.USER_PRE_LOGIN_REGISTRATION_PENDING_ERROR});
        }
        req["vgallery"] = {};
        req["vgallery"]["user"] = existingUser;
        next ();
    })
    .catch ((err) => {
        logger.error (err.toString ());
        res.status (500).json ({"message": UserConstants.USER_LOGIN_ERROR});
    });
};

/**
 * POST /login
 * Login
 */
export const login = (req, res) => {
    if (!req.vgallery || !req.vgallery.user) {
        return logger.error ("KABOOM!, can't happen");
        //next ();
    }
    HashUtils.isValidPassword (req.body.password, req.vgallery.user.password)
    .then (function (isValid) {
        if (!isValid) {
            return res.status (400).json ({"message": UserConstants.USER_LOGIN_PASSWORD_NOT_MATCH_ERROR});
        }
        //create SESSION KEY & SIGNED SESSION KEY
        res.status (200).json (req.vgallery.user);
    })
    .catch ((err) => {
        logger.error (err);
        res.status (500).json ({"message": UserConstants.USER_LOGIN_ERROR});
    });
};

export const logout = (req, res) => {

};

// will check for sid & ssid
export const profile = (req, res) => {
    UserModel.getUserObjByEmail (req.email)
    .then ((existingUser) => {
        if (!existingUser || !existingUser.email) {
            return res.status (500).json ({});
        }
        res.status (200).json (existingUser.profile);
    })
    .catch ((err) => {
        logger.error (err.toString ());
        res.status (500).json ({"message": ProcessErrorConstants.PROCESSING_ERROR});
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
