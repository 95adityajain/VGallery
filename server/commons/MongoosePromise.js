import mongoose from "mongoose";
import Promise from "bluebird";

mongoose.Promise = Promise;

const Schema = mongoose.Schema;
const model = mongoose.model.bind (mongoose);

export default mongoose;
export { Schema, model };
