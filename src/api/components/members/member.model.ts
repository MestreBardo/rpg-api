import mongoose, {
    Schema,
} from "mongoose";

import {
    MemberDocumentInterface,
    MemberModelInterface,
} from '../../interfaces/member.interface';


const MemberSchema = new Schema<MemberDocumentInterface, MemberModelInterface>({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    group: {
        type: mongoose.Types.ObjectId,
        ref: "group",
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

export default mongoose.model('member', MemberSchema);