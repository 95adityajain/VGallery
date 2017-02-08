import { Schema, model } from "../../commons/client/MongooseClient";
import { USERCONST } from "../../commons/constants/DataConstants";
import _ from "lodash";



//### "_id" will be used as unique session id
const userHistorySchema = new Schema ({
    [USERCONST.FIELD_EMAIL]: {type: String, required: true},
    [USERCONST.FIELD_CONTENT_TYPE]: {type: String, required: true, enum: [USERCONST.VALUE_CONTENT_MOVIE, USERCONST.VALUE_CONTENT_TVSHOW, USERCONST.VALUE_CONTENT_SONG]},
    [USERCONST.FIELD_CONTENT_ID]: Schema.Types.ObjectId,
    [USERCONST.FIELD_CONTENT_META]: {
        // FOR TVSHOWS
        [USERCONST.FIELD_CONTENT_META_SEASON]: Number,
        [USERCONST.FIELD_CONTENT_META_EPISODE]: Number,
        // FOR SONGS
        [USERCONST.FIELD_CONTENT_META_ALBUM]: String,
    },
    [USERCONST.FIELD_HISTORY_STATUS]: {type: String, required: true, enum: [USERCONST.VALUE_HISTORY_STATUS_COMPLETED, USERCONST.VALUE_HISTORY_STATUS_LATER, USERCONST.VALUE_HISTORY_STATUS_CURRENT]},
    //only exists when "later" status,
    //will always used this session, when searched for this particular content
    [USERCONST.FIELD_HISTORY_SEARCH_HASH]: {type: String, sparse: true},
    //only exists when "later" status,
    //seconds till completed
    [USERCONST.FIELD_COMPLETED_TILL]: Number
});

userHistorySchema.pre ("save", function (next) {
    const user = this;
    if (user [USERCONST.FIELD_HISTORY_STATUS] != USERCONST.VALUE_HISTORY_STATUS_LATER) {
        delete user [USERCONST.FIELD_HISTORY_SEARCH_HASH];
        delete user [USERCONST.FIELD_COMPLETED_TILL];
    } else {
        let val = user [USERCONST.FIELD_EMAIL] + user [USERCONST.FIELD_CONTENT_TYPE] + user [USERCONST.FIELD_CONTENT_ID];
        let metaVal = _.transform (user [USERCONST.FIELD_CONTENT_META], function (result, value) {
            return result + value;
        }, "");
        user [USERCONST.FIELD_HISTORY_SEARCH_HASH] = val + metaVal;
    }
    next ();
});

// 0-based
userHistorySchema.statics.getByEmail = function (email, pageNo) {
    const start = pageNo * USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT;
    return this.find ({[USERCONST.FIELD_EMAIL]: email})
        .skip (start).limit (USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT).lean ();
};

userHistorySchema.statics.getByEmailAndContentType = function (email, contentType, pageNo) {
    const start = pageNo * USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT;
    return this.find ({[USERCONST.FIELD_EMAIL]: email, [USERCONST.FIELD_CONTENT_TYPE]: contentType})
        .skip (start).limit (USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT).lean ();
};

userHistorySchema.statics.getAll = function (pageNo) {
    const start = pageNo * USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT;
    return this.find ().skip (start).limit (USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT).lean ();
};

userHistorySchema.statics.getAllByContentType = function (contentType, pageNo) {
    const start = pageNo * USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT;
    return this.find ({[USERCONST.FIELD_CONTENT_TYPE]: contentType})
        .skip (start).limit (USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT).lean ();
};

userHistorySchema.statics.getByEmailAndLaterMarkedContent = function (email, contentType, pageNo) {
    const start = pageNo * USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT;
    return this.find ({[USERCONST.FIELD_EMAIL]: email, [USERCONST.FIELD_CONTENT_TYPE]: contentType, [USERCONST.FIELD_HISTORY_STATUS]: USERCONST.VALUE_HISTORY_STATUS_LATER})
        .skip (start).limit (USERCONST.VALUE_HISTORY_ONE_PAGE_COUNT).lean ();
};

const userHistoryModel = model (USERCONST.HISTORY_BASE, userHistorySchema);



export default userHistoryModel;
