export const CONST = {
    REDIS_BASE: "vgallery",
};

export const USERCONST = {
    BASE: "users",
    RESET_TOKEN_BASE: "users_reset_token",
    CONTENT_REQUEST_BASE: "user_content_request",

    FIELD_ID: "_id",
    FIELD_EMAIL: "email",
    FIELD_PASSWORD: "password",
    FIELD_METADATA: "metadata",
    FIELD_IS_ADULT_CONTENT_ALLOWED: "isAdultContentAllowed",
    FIELD_IS_REGISTRATION_PENDING: "isRegistrationRequestPending",
    FIELD_IS_DISABLED: "isDisabled",
    FIELD_PROFILE: "profile",
    FIELD_NAME: "name",
    FIELD_GENDER: "gender",
    FIELD_PHOTO: "photo",
    FIELD_PREFERENCES: "preferences",
    FIELD_GENRES: "genres",
    //FIELD_AUTH: "auth",
    FIELD_SID: "sid",
    //FIELD_SSID: "ssid",
    FIELD_RESET_TOKEN: "reset_token",
    FIELD_EXPIRE_AT: "expireAt",
    FIELD_MESSAGE: "message",
    FIELD_CONTENT_REQUEST_TYPE: "content_request_type",

    VALUE_RESET_PASSWORDS_ONE_PAGE_COUNT: 5,
    VALUE_RESET_TOKEN_EXPIRY_SECONDS: 43200,
    VALUE_GENDER_MALE: "male",
    VALUE_GENDER_FEMALE: "female",
    VALUE_GENDER_OTHER: "other",
    VALUE_CONTENT_REQUEST_MOVIE: "content_request_type_movie",
    VALUE_CONTENT_REQUEST_TVSHOW: "content_request_type_tvshow",
    VALUE_CONTENT_REQUEST_TVSHOWSEASON: "content_request_type_tvshowseason",
    VALUE_CONTENT_REQUEST_SONG: "content_request_type_song",
};

export const GENRECONST = {
    BASE: "genres",

    FIELD_ID: "_id",
    FIELD_NAME: "name"
};
