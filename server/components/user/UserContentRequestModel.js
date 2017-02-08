import { Schema, model } from "../../commons/client/MongooseClient";
import { USERCONST } from "../../commons/constants/DataConstants";



const userRequestContentSchema = new Schema ({
    [USERCONST.FIELD_EMAIL]: {type: String, required: true},
    [USERCONST.FIELD_REQUEST_TYPE]: {type: String, required: true, enum: [USERCONST.VALUE_REQUEST_MOVIE, USERCONST.VALUE_REQUEST_TVSHOW, USERCONST.VALUE_REQUEST_SONG]},
    [USERCONST.FIELD_MESSAGE]: {type: String, required: true}
});

userRequestContentSchema.statics.getListByEmail = function (email) {
    return this.find ({[USERCONST.FIELD_EMAIL]: email}).lean ();
};

userRequestContentSchema.statics.getAll = function () {
    return this.find ().lean ();
};

const userRequestContentModel = model (USERCONST.CONTENT_REQUEST_BASE, userRequestContentSchema);



export default userRequestContentModel;
