import { Schema, model } from "../../commons/MongoosePromise";
const genreSchema = new Schema ({
    _id: {
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    name: {
        type: String,
        lowercase: true,
        required: true
    }
},{
    _id: false
});

// genreSchema.statics.findByName = (genreName) => {
//     return this.find ({"name": genreName}).exec ();
// };

const genreModel = model ("Genre", genreSchema);

export default genreModel;
