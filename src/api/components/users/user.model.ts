import mongoose, {
    Schema,
} from "mongoose";


import UserModelInterface from "../../interfaces/user.model.interface"
import UserDocumentInterface from "../../interfaces/user.document.interface"


const UserSchema = new Schema <UserDocumentInterface, UserModelInterface> ({
        _id: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.mongo.ObjectId()
        },
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        surname: {
            type: String,
            required: [true, "Surname is required"]
        },
        username: {
            type: String,
            required: [true, "Username is Required"]
        },
        email: {
            type: String,
            required: [true, "Email is Required"]
        },
        password: {
            type: String,
            required: [true, "Password is Required"]
        },
        birthday: {
            type: Date,
            required: [true, "Birthday is Required"]
        },
        active: {
            type: Boolean,
            default: true
        },
        country: {
            type: String,
            required: [true, "Country is Required"]
        },
        gender: {
            type: String,
            required: [true, "Gender is required"]
        },
        city: {
            type: String
        },
        registeredOn: {
            type: Date,
            default: Date.now
        },
        lastModifiedOn: {
            type: Number,
            default: new Date().getTime()
        }
    })

UserSchema.statics.getByEmailOrUsername = async function (email: string, username: string) {
    return await this.findOne({
        $or: [{
            email
        }, {
            username
        }]
    });
}

UserSchema.statics.getByTextToSearch = async function (text: string, page: number) {
    const textToSearch = new RegExp(text, "i")
    return await this.find({
        $or: [{
            email: textToSearch,
        }, {
            username: textToSearch
        }]
        
        
    })
    .select('-password -registeredOn -lastModifiedOn -__v')
    .skip((page - 1) * 20)
    .limit(20);
}

UserSchema.methods.validateData = async function () {
    try {
        await this.validate();
        return [];
    } catch (error) {
        const errors = [];

        if (error.errors["name"])
            errors.push(error.errors["name"].message)

        if (error.errors["surname"])
            errors.push(error.errors["surname"].message)

        if (error.errors["username"])
            errors.push(error.errors["username"].message)

        if (error.errors["email"])
            errors.push(error.errors["email"].message)

        if (error.errors["password"])
            errors.push(error.errors["password"].message)

        if (error.errors["birthday"])
            errors.push(error.errors["birthday"].message)

        if (error.errors["country"])
            errors.push(error.errors["country"].message)

        if (error.errors["gender"])
            errors.push(error.errors["gender"].message)

        return errors;
    }
}

export default mongoose.model('User', UserSchema);