import mongoose from "../promisify/MongoosePromise";
import config from "../../config";
import Utils from "../utils";
import ProcessErrorConstants from "../constants/ErrorConstants";



const Schema = mongoose.Schema;
const model = mongoose.model.bind (mongoose);

mongoose.connect (config.mongoose.getUrlString ());
mongoose.connection.on("error",function (err) {
    Utils.log("error", ProcessErrorConstants.MONGO_ERROR + err);
});
mongoose.connection.on("disconnected", function () {
    Utils.log("error", "MONGO DISCONNECTED");
});

//TODO: add error handling for severe errors.



export default mongoose;
export { Schema, model };
