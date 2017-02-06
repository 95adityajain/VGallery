import { Schema, model } from "../../commons/client/MongooseClient";
import { USERCONST } from "../../commons/constants/DataConstants";



const userPasswordResetSchema = new Schema ({
    [USERCONST.FIELD_ID]: {type: String, required: true}, //email as _id
    [USERCONST.FIELD_RESET_TOKEN]: {type: String, required: true},
    [USERCONST.FIELD_EXPIRE_AT]: {type: Date, default: undefined}
}, {
    [USERCONST.FIELD_ID]: false
});

//
userPasswordResetSchema.index({[USERCONST.FIELD_EXPIRE_AT]: 1}, {expireAfterSeconds: 0});

userPasswordResetSchema.statics.getList = function () {
    return this.find ().lean ();
};

userPasswordResetSchema.statics.upsertToken = function (email, token, expiresAt) {
    return this.update ({[USERCONST.FIELD_ID]: email},
        {$set: {[USERCONST.FIELD_ID]: email, [USERCONST.FIELD_RESET_TOKEN]: token, [USERCONST.FIELD_EXPIRE_AT]: expiresAt}}, {runValidators: true, upsert: true});
};

const userPasswordResetModel = model (USERCONST.RESET_TOKEN_BASE, userPasswordResetSchema);



export default userPasswordResetModel;
