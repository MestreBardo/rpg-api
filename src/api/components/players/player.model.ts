import { PlayerDocumentInterface, PlayerModelInterface } from './../../interfaces/player.interface';
import mongoose, {
    Schema,
} from "mongoose";


const PlayerSchema = new Schema<PlayerDocumentInterface, PlayerModelInterface>({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    campaign: {
        type: mongoose.Types.ObjectId,
        ref: "campaign",
        required: true
    },
    since: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "player"
    },
    activeCharacter: {
        type: mongoose.Types.ObjectId,
        ref: "character",
        default: null
    },
    characters: {
        type: [mongoose.Types.ObjectId],
        ref: "character",
        default: []
    }

})

export default mongoose.model('player', PlayerSchema);