import {
    Request, Response
} from "express";
import httpResponse from "../../services/httpResponse.service";
import { compareEncryptString, generateToken, encryptString } from "../../services/helper.service";
import UserModel from "./user.model";
import RequestWithUserInterface from "../../interfaces/requestWithUser.interface";


const login = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.getByEmailOrUsername(req.body.login, req.body.login);

        if (!user)
            return httpResponse.notFound(res, ["User not found in database"]);

        if (!user.active)
            return httpResponse.gone(res, ["User is Gone"]);

        const passwordMatch = await compareEncryptString(req.body.password, user.password);

        if (passwordMatch)
            return httpResponse.unauthorized(res, ["User password don't match"]);

        const token = await generateToken(user, [
            "_id",
            "name",
            "surname",
            "birthday",
            "username",
            "email"
        ]);

        return httpResponse.ok(res, token)

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message])
    }


};

const register = async (req: Request, res: Response) => {
    try {

        const user = new UserModel(req.body)
        const errors = await user.validateData();

        if (errors.length) {
            return httpResponse.unprocessableEntity(res, errors);
        }

        const userInDataBase = await UserModel.getByEmailOrUsername(user.email, user.username);

        if (userInDataBase)
            return httpResponse.conflict(res, ["USERNAME or EMAIL is already taken"]);

        user.password = await encryptString(user.password);

        await user.save();
        
        const token = await generateToken(user, [
            "_id",
            "name",
            "surname",
            "birthday",
            "username",
            "email"
        ]);

        return httpResponse.created(res, token);

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message])
    }


};

const getUser = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const user = await UserModel.findById(id).select("-password -__v -lastModifiedOn");
        if (!user) {
            return httpResponse.notFound(res, ["User not found"]);
        }

        return httpResponse.ok(res, user);

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const textToSearch = req.query.textToSearch ? `${req.query.textToSearch}` : "";
        const page = req.query.page ? +`${req.query.page}` : 1;
        const users = await UserModel.getByTextToSearch(textToSearch, page)
        if (!users.length) {
            return httpResponse.notFound(res, ["User not found using this criteria"]);
        }
        return httpResponse.ok(res, users);
    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}

const patchUserPassword = async (req: RequestWithUserInterface, res: Response) => {
    try {

        if (!req.body.password) {
            return httpResponse.unprocessableEntity(res, ["New Password is not defined in body"]);
        }

        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                password: await encryptString(req.body.password),
                lastModifiedOn: new Date().getTime()
            }
        }, {new: true}).select('-password -__v -lastModifiedOn');

        if (!user) {
            return httpResponse.notFound(res, ["User not found in database"]);
        }

        return httpResponse.ok(res, user);
        

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}

const patchUserEmail = async (req: Request, res: Response) => {
    try {

        if (!req.body.email) {
            return httpResponse.unprocessableEntity(res, ["New email is not defined in body"]);
        }

        const userInDatabase = await UserModel.findOne({email: req.body.email, _id: {$ne: req.params.id}});
        if (userInDatabase) {
            return httpResponse.conflict(res, ["Email already in use"]);
        }
        
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                email: req.body.email,
                lastModifiedOn: new Date().getTime()
            }
        }, {new: true}).select('-password -__v -lastModifiedOn');

        if (!user) {
            return httpResponse.notFound(res, ["User not found"]);
        }

        return httpResponse.ok(res, user);

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}

const patchUserUsername = async (req: Request, res: Response) => {
    try {
        if (!req.body.username) {
            return httpResponse.unprocessableEntity(res, ["New username is not defined in body"]);
        }

        const userInDatabase = await UserModel.findOne({username: req.body.username, _id: {$ne: req.params.id}});
        if (userInDatabase) {
            return httpResponse.conflict(res, ["Username already in use"]);
        }
        
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                lastModifiedOn: new Date().getTime()
            }
        }, {new: true}).select('-password -__v -lastModifiedOn');

        if (!user) {
            return httpResponse.notFound(res, ["User not found"]);
        }

        return httpResponse.ok(res, user);

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}

const inactiveUser = async (req: Request, res: Response) => {
    try {
        
        const user = await UserModel.findById(req.params.id).select('-password -__v -registeredOn');

        if (!user) {
            return httpResponse.notFound(res, ["User not found"]);
        }

        if (!user.active) {
            return httpResponse.gone(res, ["User already inactivated"]);
        }

        user.active = false;
        user.lastModifiedOn = new Date().getTime();
        await user.save();

        return httpResponse.ok(res, user);

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}


export {
    login,
    register,
    getUsers,
    getUser,
    patchUserPassword,
    patchUserEmail,
    patchUserUsername,
    inactiveUser
}