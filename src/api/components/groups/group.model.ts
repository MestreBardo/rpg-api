import mongoose, {
    Schema,
} from "mongoose";

import {
    GroupDocumentInterface,
    GroupModelInterface,
} from './../../interfaces/group.interface';


const GroupSchema = new Schema<GroupDocumentInterface, GroupModelInterface>({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.mongo.ObjectId()
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    logo: {
        type: String
    },
    description: {
        type: String
    },
    userCount: {
        type: Number,
        default: 1
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastModifiedOn: {
        type: Number,
        default: new Date().getTime()
    }

})

GroupSchema.methods.validateData = async function () {
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

export default mongoose.model('Group', GroupSchema);