import { Request, Response } from "express";
import RequestWithUserInterface from "../../interfaces/requestWithUser.interface";
import httpResponse from "../../services/httpResponse.service";
import MemberModel from "../member/member.model";
import UserModel from "../users/user.model";
import GroupModel from "./group.model";

export const postGroup = async (req: RequestWithUserInterface, res: Response) => {
    try {
        const group = new GroupModel(req.body);
        const errors = await group.validateData();
    
        if (errors.length) 
            return httpResponse.unprocessableEntity(res, errors)
    
        const existGroup = await GroupModel.findOne({name: group.name}).select('_id');
    
        if (existGroup) 
            return httpResponse.conflict(res, ["Group name is already in use"]);
    
        await group.save();
    
        const member = new MemberModel({
            userId: req.user._id,
            username: req.user.username,
            email: req.user.email,
            groupId: group._id,
            groupName: group.name,
            role: "admin"
        })
    
        await member.save();
    
        await UserModel.findByIdAndUpdate(req.user._id, {$inc: {groupCount: 1}});
    
        return httpResponse.created(res, group)

    } catch (error) {
        return httpResponse.internalServerError(res, [error.message]);
    }
   

}

export const getGroupUsers = async (req: Request, res: Response) => {
    
    try {
        const page = (+req.query.page || 1) - 1;
        const users = await MemberModel
        .find({groupId: req.params.id})
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