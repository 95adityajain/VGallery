export const CONST = {
    REDIS_BASE: "vgallery",
};

export const USERCONST = {
    BASE: "users",
    RESET_TOKEN_BASE: "users_reset_token",

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

    VALUE_RESET_PASSWORDS_ONE_PAGE_COUNT: 5,
    VALUE_RESET_TOKEN_EXPIRY_SECONDS: 43200,
    VALUE_GENDER_MALE: "male",
    VALUE_GENDER_FEMALE: "female",
    VALUE_GENDER_OTHER: "other"
};

export const GENRECONST = {
    BASE: "genres",

    FIELD_ID: "_id",
    FIELD_NAME: "name"
};
