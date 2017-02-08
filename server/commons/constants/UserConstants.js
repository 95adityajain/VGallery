const constants = {
    PROCESSING_ERROR: "Oops! something went wrong",

    USER_REGISTRATION_REQUEST: "Registration request submitted",
    USER_REGISTRATION_REQUEST_ERROR: "Registration request submission failed",
    USER_REGISTRATION_EMAIL_ALREADY_EXISTS: "This email-id already registered with us",

    USER_PRE_LOGIN_EMAIL_NOT_EXISTS_ERROR: "This email-id is not registered",
    USER_PRE_LOGIN_REGISTRATION_PENDING_ERROR: "Your registration request is pending",
    USER_PRE_LOGIN_ACCOUNT_DISABLED_ERROR: "Your account is disabled",
    USER_LOGIN_ERROR: "Login request failed",
    USER_LOGOUT_ERROR: "Logout request failed",

    USER_PASSWORD_NOT_MATCH_ERROR: "Password didn't match",

    USER_GET_PROFILE_ERROR: "Unable to get user basic profile",
    USER_GET_PREFERENCES_ERROR: "Unable to get user preferences",
    USER_GET_CONTENT_REQUEST_ERROR: "Unable to get user content requests",
    USER_GET_HISTORY_ERROR: "Unable to get user history",
    USER_GET_CONTINUE_ERROR: "Unable to get user continue content",

    USER_UPDATE_PASSWORD_ERROR: "Unable to update password",
    //USER_UPDATE_OLD_PASSWORD_NOT_MATCH_ERROR: "Old password didn't match",
    USER_UPDATE_PROFILE_ERROR: "Unable to update basic profile",
    USER_UPDATE_PREFERENCES_ERROR: "Unable to update preferences",
    USER_CREATE_CONTENT_REQUEST_ERROR: "Unable to set content request",

    USER_SESSION_AUTHENTICATION_FAILED_ERROR: "Authentication failed",
    USER_MISSING_QUERY_PARAMS_ERROR: "Missing required query params is request",

    USER_RESET_PASSWORD_REQUEST_ERROR: "Reset password request failed",
    USER_RESET_PASSWORD_WRONG_TOKEN: "Reset password failed, Wrong token",

    USER_CACHE_FAILED: "Cache failed, Serving from slow storage.",

    USER_REDIS_GET_ERROR: "Unable to get user in redis",
    USER_REDIS_SET_ERROR: "Unable to set user in redis"
};



export default constants;
