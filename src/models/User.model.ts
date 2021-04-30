import mongoose, {
    Schema,
} from "mongoose";
import {UserInterface, IUserModel} from "../Interfaces/User.Interface";

const UserSchema = new Schema<UserInterface, IUserModel>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    birthday: { type: Date, required: true },
    active: { type: Boolean, default: true },
    country: { type: String, required: true },
    gender: {type: String, required: true},
    city: { type: String },
    registeredOn: { type: Date, default: Date.now },
    lastModifiedOn: { type: Number, default: new Date().getTime()}
})

UserSchema.statics.getByEmailOrUsername = async function(emailOrUsername) {
    return await this.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]});
}

UserSchema.methods.tester = async function() {
    return "teste";
}
export default mongoose.model('User', UserSchema);