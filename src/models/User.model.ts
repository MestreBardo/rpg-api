import mongoose, {
    Schema,
} from "mongoose";
import {
    compare, hash
} from "bcrypt"
import {
    sign
} from "jsonwebtoken";

import {
    UserInterface,
    UserModelInterface
} from "../Interfaces/User.Interface";


const UserSchema = new Schema < UserInterface,
    UserModelInterface > ({
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

UserSchema.methods.checkPassword = async function (password: string) {
    return compare(password, this.password);
}

UserSchema.methods.encryptPassword = async function (newPassword = null) {
    this.password = await hash(newPassword ?? this.password, +`${process.env.SALT}`);
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

UserSchema.methods.generateToken = function () {
    return `Bearer ${sign({
            _id: this._id,
            username: this.username,
            name: this.name,
            surname: this.surname,
            email: this.email,
            country: this.country,
            gender: this.gender,
            city: this.city
        },
        `${process.env.SALT}`, {
            expiresIn: '1h'
        }
    )}`
}

export default mongoose.model('User', UserSchema);