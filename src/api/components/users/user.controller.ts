import { checkFieldExistence } from './../../services/helper.service';
import {
    Request, Response
} from "express";
import httpResponse from "../../services/httpResponse.service";
import { generateToken, encryptString } from "../../services/helper.service";
import UserModel from "./user.model";
import MemberModel from "../members/member.model";
import ErrorWithMessages from "../../common/errorWithMessages";
import * as UserService from "../../services/user.service"


export const login = async (req: Request, res: Response) => {
    try {
        const token = await UserService.login(req.body);

       return httpResponse.ok(res, {token})

    } catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, [error.messages]);

        return httpResponse.internalServerError(res, [error.message])
    }


};

export const register = async (req: Request, res: Response) => {
    try {
        const token = await UserService.register(req.body)
        return httpResponse.ok(res, {token});

    } catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, [...error.messages]);

        return httpResponse.internalServerError(res, [error.message])
    }


};

export const getUser = async (req: Request, res: Response) => {
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

export const getUsers = async (req: Request, res: Response) => {
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

export const patchUserPassword = async (req: Request, res: Response) => {
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

export const patchUserEmail = async (req: Request, res: Response) => {
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

// export const patchUserUsername = async (req: Request, res: Response) => {
//     try {

//         checkFieldExistence(req.body, ["username"]);

//         checkUserUniqueness(req.body.username, req.params.id, "username");
        
//         const user = await UserModel.findByIdAndUpdate(req.params.id, {
//             $set: {
//                 username: req.body.username,
//                 lastModifiedOn: new Date().getTime()
//             }
//         }, {new: true}).select('-password -__v -lastModifiedOn');

//         if (!user) {
//             return httpResponse.notFound(res, ["User not found"]);
//         }

//         return httpResponse.ok(res, user);

//     } catch (error) {
//         if(error instanceof ErrorWithMessages)
//             return httpResponse[error.status](res, error.messages);

//         return httpResponse.internalServerError(res, [error.message])
//     }
// }

export const inactiveUser = async (req: Request, res: Response) => {
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

export const getUserGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = (+req.query.page || 1) - 1;
        const groups = await MemberModel
            .find({userId: req.params.id})
            .skip(page * 20)
            .limit(20)
            .select('-__v -user')
            .lean()
            .populate("group", {name: 1, logo: 1})
        
        if (!groups.length) {
            return httpResponse.notFound(res, ["No group found for this user"]);
        }
        const count = (await UserModel.findById(req.params.id).select("groupCount")).groupCount;
        return httpResponse.ok(res, {
            count, groups
        });
    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }

}