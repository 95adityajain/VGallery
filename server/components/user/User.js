import { Schema, model } from "../../commons/MongoosePromise";
import metadataSchema from "../Metadata";
import HashUtils from "../../commons/utils/HashUtils";
import ErrorConstants from "../../commons/constants/ErrorConstants";
import UserConstants from "../../commons/constants/UserConstants";





/**
 * Schema for @code User collection
 * @type {Schema}
 */
const userSchema = new Schema ({
    email: {
        type: String, lowercase: true, unique: true, required: true, index: true, sparse: true
    },
    name: {
        first_name: {
            type: String, required:true
        },
        last_name: String
    },
    password: {
        type: String, required: true, select: false, set: setPassword
    },
    passwordResetToken: {
        type: String, select: false
    },
    passwordResetExpires: {
        type: Date, select: false
    },
    profile: {
        genres: [
            {
                ref: "Genre",type: Number
            }
        ],
        //peoples: [{type: Number}],
        gender: {
            type: String, lowercase: true, enum: [UserConstants.GENDER_MALE, UserConstants.GENDER_FEMALE, UserConstants.GENDER_OTHER]
        },
        picture: String
    },
    metadata: metadataSchema
},{
    id: false, _id: false
});

/**
 * setter for @code password in @code userSchema
 * @param {String} password
 * @return {String} hashedPassword
 */
const setPassword = (password) => {
    return HashUtils.generatePasswordHash (password)
        .then ((hashedPassword) => {
            return hashedPassword;
        })
        .catch (() => {
            throw new Error (ErrorConstants.PASSWORD_HASH_GENERATION_ERROR);
        });
};
//userSchema.path ("password").set (setPassword);

// userSchema.statics.getUser =  (email) => {
//     return this.find ({"email": email}).exec ();
// }






const userModel = model ("User", userSchema);

export default userModel;
