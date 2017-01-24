import { Schema } from "../commons/MongoosePromise";

const metadataSchema = new Schema ({
    createdDate: {type: Date, default: new Date ()},
    modifiedDate: Date
});

export default metadataSchema;
