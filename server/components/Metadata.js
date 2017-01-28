import { Schema } from "../commons/MongoosePromise";

const metadataSchema = new Schema ({
    createdDate: {type: Date, default: new Date ()},
    modifiedDate: {type: Date, default: null},
    isDeleted: {type: Boolean, default: false}
});

export default metadataSchema;
