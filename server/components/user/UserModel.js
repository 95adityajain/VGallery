import { Schema, model } from "../../commons/MongoosePromise";
import HashUtils from "../../commons/utils/HashUtils";
//import ErrorConstants from "../../commons/constants/ErrorConstants";
import UserConstants from "../../commons/constants/UserConstants";
import logger from "../../logger";





/**
 * Schema for @code User collection
 * @type {Schema}
 */
const userSchema = new Schema ({
    email: {type: String, lowercase: true, unique: true, required: true},
    password: {type: String, required: true},
    passwordResetToken: String,
    passwordResetExpires: String,
    isAdultContentAllowed: {type: Boolean, default: false},
    isRegistrationRequestPending: {type: Boolean, default: true},
    isDisabled: {type: Boolean, default: false},
    profile: {
        name: {
            first_name: {type: String, required:true},
            last_name: {type: String, required:true}
        },
        genres: [{ref: "Genre",type: Number}],
        // permissions: [{ref: "Permission", type:Schema.ObjectID}]
        //peoples: [{type: Number}],
        gender: {type: String, lowercase: true, enum: [UserConstants.GENDER_MALE, UserConstants.GENDER_FEMALE, UserConstants.GENDER_OTHER]},
        picture: String
    },
    //metadata: metadataSchema
});

userSchema.pre ("save", function(next) {
    const user = this;
    if (!user.isModified ("password")) {
        return next ();
    }
    HashUtils.generatePasswordHash (user.password)
    .then ((hashedPassword) => {
        user.password = hashedPassword;
        next ();
    })
    .catch ((err) => {
        logger.error (err);//(ErrorConstants.PASSWORD_HASH_GENERATION_ERROR);
        next (err);
    });
});

userSchema.statics.getUserDocByEmail =  function (email) {
    return this.findOne ({"email": email});
};

userSchema.statics.getUserObjByEmail =  function (email) {
    return this.findOne ({"email": email}).lean ();
};




const userModel = model ("User", userSchema);

export default userModel;
