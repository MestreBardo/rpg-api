import { addUserToGroup } from './../../services/user.service';
import {
    GroupDocumentInterface
} from './../../interfaces/group.interface';
import {
    Request,
    Response
} from "express";
import RequestWithUserInterface from "../../interfaces/requestWithUser.interface";
import {
    createGroup
} from "../../services/group.service";
import httpResponse from "../../services/httpResponse.service";
import MemberModel from "../member/member.model";
import UserModel from "../users/user.model";
import GroupModel from "./group.model";
import {
    createMember
} from '../../services/member.service';
import {
    UserDocumentInterface
} from '../../interfaces/user.interface';

export const postGroup = async (req: RequestWithUserInterface, res: Response) => {
    try {
        const group = await createGroup(<GroupDocumentInterface>req.body);

        if (group.error)
            return httpResponse[group.error](group.payload);

        await createMember(<UserDocumentInterface>req.user, <GroupDocumentInterface>group.payload, "admin")

        await addUserToGroup(req.user._id);

        return httpResponse.created(res, group)

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }


}

export const getGroupUsers = async (req: Request, res: Response) => {

    try {
        const page = (+req.query.page || 1) - 1;
        const users = await MemberModel
            .find({
                groupId: req.params.id
            })
            .skip(page * 20)
            .limit(20)
            .select('-__v -groupId -groupName -_id')

        if (!users.length) {
            return httpResponse.notFound(res, ["No user found for this group"]);
        }

        const count = (await GroupModel.findById(req.params.id).select("userCount")).userCount;

        return httpResponse.ok(res, {
            count,
            users
        })
    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
}