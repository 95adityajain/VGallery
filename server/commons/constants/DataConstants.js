export const CONST = {
    REDIS_BASE: "vgallery",
};

export const USERCONST = {
    BASE: "users",
    RESET_TOKEN_BASE: "users_reset_token",
    CONTENT_REQUEST_BASE: "user_content_request",
    HISTORY_BASE: "user_history",

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
    FIELD_CONTENT_TYPE: "content_type",
    FIELD_CONTENT_META: "content_meta",
    FIELD_CONTENT_META_SEASON: "content_meta_season",
    FIELD_CONTENT_META_EPISODE: "content_meta_episode",
    FIELD_CONTENT_META_ALBUM: "content_meta_album",
    FIELD_CONTENT_ID: "content_id",
    FIELD_HISTORY_STATUS: "status",
    FIELD_HISTORY_SEARCH_HASH: "history_search_hash",
    FIELD_COMPLETED_TILL: "completed_till",

    VALUE_RESET_PASSWORDS_ONE_PAGE_COUNT: 5,
    VALUE_HISTORY_ONE_PAGE_COUNT: 8,
    VALUE_RESET_TOKEN_EXPIRY_SECONDS: 43200,
    VALUE_GENDER_MALE: "male",
    VALUE_GENDER_FEMALE: "female",
    VALUE_GENDER_OTHER: "other",
    VALUE_CONTENT_MOVIE: "content_type_movie",
    VALUE_CONTENT_TVSHOW: "content_type_tvshow",
    VALUE_CONTENT_SONG: "content_type_song",
    VALUE_HISTORY_STATUS_COMPLETED: "completed",
    VALUE_HISTORY_STATUS_LATER: "later",
    VALUE_HISTORY_STATUS_CURRENT: "current" //TODO: (THINK), IF NEED TO USE IT OR NOT.
};

export const GENRECONST = {
    BASE: "genres",

    FIELD_ID: "_id",
    FIELD_NAME: "name"
};
