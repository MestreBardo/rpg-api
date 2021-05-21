import { checkGroupUniqueness, groupUsers, groupUsersCount, recoverGroup, saveGroup } from './../../services/group.service';
import { addUserToGroup } from './../../services/user.service';
import {
    Request,
    Response
} from "express";
import RequestWithUserInterface from "../../interfaces/requestWithUser.interface";

import httpResponse from "../../services/httpResponse.service";
import {
    createMember
} from '../../services/member.service';
import ErrorWithMessages from '../../common/errorWithMessages';
import { createValidGroup } from '../../services/group.service';

export const postGroup = async (req: RequestWithUserInterface, res: Response) => {
    try {
        const group = await createValidGroup(req.body, req.user);
        await checkGroupUniqueness(group.name);
        await saveGroup(group);
        await createMember(req.user, group, "admin")
        await addUserToGroup(req.user._id);
        return httpResponse.created(res, group)

    } catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, [error.messages]);

        return httpResponse.internalServerError(res, [error.message])
    }

}

export const getGroup = async (req: Request, res: Response) => {
    try {
        const group = await recoverGroup(req.params.id);
        return httpResponse.ok(res, group)
    } catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, error.messages);

        return httpResponse.internalServerError(res, [error.message])
    }
}

export const getGroupUsers = async (req: Request, res: Response) => {

    try {

        const count = await groupUsersCount(req.params.id);
        const users = await groupUsers(req.params.id, <string>req.query.page);

        return httpResponse.ok(res, {
            count,
            users
        })
    } catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, error.messages);

        return httpResponse.internalServerError(res, [error.message])
    }
}