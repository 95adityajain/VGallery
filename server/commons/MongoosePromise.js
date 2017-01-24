import mongoose from "mongoose";
import Promise from "bluebird";

mongoose.Promise = Promise;


export default mongoose;
//export { Schema, model } = mongoose;
