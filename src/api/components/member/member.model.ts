import mongoose, {
    Schema,
} from "mongoose";

import {
    MemberDocumentInterface,
    MemberModelInterface,
} from './../../interfaces/member.interface';


const MemberSchema = new Schema<MemberDocumentInterface, MemberModelInterface>({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.mongo.ObjectId()
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    groupLogo: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    groupId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    since: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: "member"
    }

})

export default mongoose.model('Member', MemberSchema);