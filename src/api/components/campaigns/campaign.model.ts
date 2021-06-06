import { CampaignDocumentInterface, CampaignModelInterface } from './../../interfaces/campaign.interface';
import mongoose, {
    Types,
    Schema
} from "mongoose";


const CampaignSchema = new Schema<CampaignDocumentInterface, CampaignModelInterface>({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, "Owner id is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    group: {
        type: mongoose.Types.ObjectId,
        ref: "group"
    },
    cover: {
        type: String
    },
    description: {
        type: String
    },
    playerCount: {
        type: Number,
        default: 1
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    lastModifiedOn: {
        type: Number,
        default: new Date().getTime()
    },
    system: {
        type: mongoose.Types.ObjectId,
        ref: "system"
    }

})  

CampaignSchema.methods.validateData = async function () {
    try {
        await this.validate();
        return [];
    } catch (error) {
        const errors = [];

        if (error.errors["name"])
            errors.push(error.errors["name"].message)

        return errors;
    }
}

export default mongoose.model('campaign', CampaignSchema);