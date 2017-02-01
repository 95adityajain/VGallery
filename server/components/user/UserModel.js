import { Schema, model } from "../../commons/client/MongooseClient";
import HashUtils from "../../commons/utils/HashUtils";
//import ErrorConstants from "../../commons/constants/ErrorConstants";
import { USERCONST } from "../../commons/constants/DataConstants";
import logger from "../../logger";





/**
 * Schema for @code User collection
 * @type {Schema}
 */
const userSchema = new Schema ({
    [USERCONST.FIELD_EMAIL]: {type: String, lowercase: true, unique: true, required: true},
    [USERCONST.FIELD_PASSWORD]: {type: String, required: true},
    // passwordResetToken: String,
    // passwordResetExpires: String,
    [USERCONST.FIELD_METADATA]: {
        [USERCONST.FIELD_IS_ADULT_CONTENT_ALLOWED]: {type: Boolean, default: false},
        [USERCONST.FIELD_IS_REGISTRATION_PENDING]: {type: Boolean, default: true},
        [USERCONST.FIELD_IS_DISABLED]: {type: Boolean, default: false}
    },
    [USERCONST.FIELD_PROFILE]: {
        [USERCONST.FIELD_NAME]: {type: String, required:true},
        [USERCONST.FIELD_GENDER]: {type: String, lowercase: true, required: true, enum: [USERCONST.VALUE_GENDER_MALE, USERCONST.VALUE_GENDER_FEMALE, USERCONST.VALUE_GENDER_OTHER]},
        [USERCONST.FIELD_PHOTO]: String
    },
    [USERCONST.FIELD_PREFERENCES]: {
        [USERCONST.FIELD_GENRES]: [{ref: "Genre",type: Number}],
        //peoples: [{type: Number}],
    }
    // permissions: [{ref: "Permission", type:Schema.ObjectID}]
    //metadata: metadataSchema
});

userSchema.pre ("save", function(next) {
    const user = this;
    if (!user.isModified (USERCONST.FIELD_PASSWORD)) {
        return next ();
    }
    HashUtils.generateHash (user[USERCONST.FIELD_PASSWORD])
    .then ((hashedPassword) => {
        user[USERCONST.FIELD_PASSWORD] = hashedPassword;
        next ();
    })
    .catch ((err) => {
        logger.error (err);//(ErrorConstants.PASSWORD_HASH_GENERATION_ERROR);
        next (err);
    });
});

userSchema.statics.getDocByEmail =  function (email) {
    return this.findOne ({[USERCONST.FIELD_EMAIL]: email});
};

userSchema.statics.getObjByEmail =  function (email) {
    return this.findOne ({[USERCONST.FIELD_EMAIL]: email}).lean ();
};

userSchema.statics.getFieldByEmail = function (email, fieldName) {
    return this.findOne ({[USERCONST.FIELD_EMAIL]: email}, {[fieldName]: 1}).lean ();
};

userSchema.statics.getMultiFieldByEmail = function (email, projectionObj) {
    return this.findOne ({[USERCONST.FIELD_EMAIL]: email}, projectionObj).lean ();
};

userSchema.statics.isEmailExists = function (email) {
    return this.count ({[USERCONST.FIELD_EMAIL]: email}).then ((count) => {
        return (count && count > 0)? true : false;
    });
};


const userModel = model (USERCONST.BASE, userSchema);

export default userModel;
