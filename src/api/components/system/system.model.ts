import { SystemDocumentInterface, SystemModelInterface } from './../../interfaces/system.interface';
import mongoose, {
    Schema,
} from "mongoose";

const SystemSchema = new Schema<SystemDocumentInterface, SystemModelInterface>({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        default: 0.1
    },
    createOn: {
        type: Date,
        default: Date.now
    },
   
})

export default mongoose.model('system', SystemSchema);