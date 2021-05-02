import {
    NextFunction,
    Request,
    Response
} from "express";
import httpResponse from "../common/http-response";
import UserModel from "../models/User.model";
import { CastError } from "mongoose";


const login = async (req: Request) => {
    try {

        const user = await UserModel.getByEmailOrUsername(req.body.login, req.body.login);

        if (!user)
            return httpResponse.notFound(["User not found in database"]);

        if (!user.active)
            return httpResponse.gone(["User is Gone"]);

        if (!user.checkPassword(req.body.password))
            return httpResponse.unauthorized(["User password don't match"])

        return httpResponse.ok(user.generateToken())

    } catch (error) {
        return httpResponse.internalServerError([error.message])
    }


};

const register = async (req: Request) => {
    try {

        const user = new UserModel(req.body)
        const errors = await user.validateData();

        if (errors.length) {
            return httpResponse.unprocessableEntity(errors);
        }

        const userInDataBase = await UserModel.getByEmailOrUsername(user.email, user.username);

        if (userInDataBase)
            return httpResponse.conflict(["USERNAME or EMAIL is already taken"]);

        await user.encryptPassword();

        await user.save();
        
        return httpResponse.created(user.generateToken());

    } catch (error) {
        return httpResponse.internalServerError([error.message])
    }


};


export {
    login,
    register
}