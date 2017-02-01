import { Schema, model } from "../../commons/client/MongooseClient";
import { GENRECONST } from "../../commons/constants/DataConstants";



const genreSchema = new Schema ({
    [GENRECONST.FIELD_ID]: { type: Number, unique: true, required: true, index: true },
    [GENRECONST.FIELD_NAME]: { type: String, lowercase: true, required: true }
},{
    [GENRECONST.FIELD_ID]: false
});

// genreSchema.statics.findByName = (genreName) => {
//     return this.find ({"name": genreName}).exec ();
// };

const genreModel = model (GENRECONST.BASE, genreSchema);

export default genreModel;
