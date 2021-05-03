import {
    hash
} from "bcrypt";
import {
    Request,
    Response,
} from "express";
import httpResponse from "../common/http-response";
import UserModel from "../models/User.model";


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

const getUsers = async (req: Request) => {
    try {
        const textToSearch = req.query.textToSearch ? `${req.query.textToSearch}` : "";
        const page = req.query.page ? +`${req.query.page}` : 1;
        const users = await UserModel.getByTextToSearch(textToSearch, page)
        if (!users.length) {
            return httpResponse.notFound(["User not found using this criteria"]);
        }
        httpResponse.ok(users);
    } catch (error) {
        return httpResponse.internalServerError([error.message]);
    }
}

const getUser = async (req: Request) => {
    try {
        const id: string = req.params.id;
        const user = await UserModel.findById(id).select("-password -__v -lastModifiedOn");

        if (!user) {
            return httpResponse.notFound(["User not found"]);
        }

        return httpResponse.ok(user);

    } catch (error) {
        return httpResponse.internalServerError([error.message]);
    }
}

const patchUserPassword = async (req: Request) => {
    try {

        if (!req.body.password) {
            return httpResponse.unprocessableEntity(["New Password is not defined in body"]);
        }

        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                password: await hash(req.body.password, +`${process.env.SALT}`),
                lastModifiedOn: new Date().getTime()
            }
        }, {new: true}).select('-password -__v -lastModifiedOn');

        if (!user) {
            httpResponse.notFound(["User not found in database"]);
        }

        return httpResponse.ok(user);
        

    } catch (error) {
        return httpResponse.internalServerError([error.message]);
    }
}

const patchUserEmail = async (req: Request) => {
    try {

        if (!req.body.email) {
            return httpResponse.unprocessableEntity(["New email is not defined in body"]);
        }

        const userInDatabase = await UserModel.findOne({email: req.body.email, _id: {$ne: req.params.id}});
        if (userInDatabase) {
            return httpResponse.conflict(["Email already in use"]);
        }
        
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                email: req.body.email,
                lastModifiedOn: new Date().getTime()
            }
        }, {new: true}).select('-password -__v -lastModifiedOn');

        if (!user) {
            return httpResponse.notFound(["User not found"]);
        }

        return httpResponse.ok(user);

    } catch (error) {
        return httpResponse.internalServerError([error.message]);
    }
}

const patchUserUsername = async (req: Request) => {
    try {
        if (!req.body.username) {
            return httpResponse.unprocessableEntity(["New username is not defined in body"]);
        }

        const userInDatabase = await UserModel.findOne({username: req.body.username, _id: {$ne: req.params.id}});
        if (userInDatabase) {
            return httpResponse.conflict(["Username already in use"]);
        }
        
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                lastModifiedOn: new Date().getTime()
            }
        }, {new: true}).select('-password -__v -lastModifiedOn');

        if (!user) {
            return httpResponse.notFound(["User not found"]);
        }

        return httpResponse.ok(user);

    } catch (error) {
        return httpResponse.internalServerError([error.message]);
    }
}

const inactiveUser = async (req: Request) => {
    try {
        
        const user = await UserModel.findById(req.params.id).select('-password -__v -registeredOn');

        if (!user) {
            return httpResponse.notFound(["User not found"]);
        }

        if (!user.active) {
            return httpResponse.gone(["User already inactivated"]);
        }

        user.active = false;
        user.lastModifiedOn = new Date().getTime();
        await user.save();

        return httpResponse.ok(user);

    } catch (error) {
        return httpResponse.internalServerError([error.message]);
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