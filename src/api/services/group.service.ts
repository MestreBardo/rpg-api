import { MemberDocumentInterface } from './../interfaces/member.interface';
import { UserDocumentInterface } from './../interfaces/user.interface';
import ErrorWithMessages from '../common/errorWithMessages';
import GroupModel from '../components/groups/group.model';
import MemberModel from '../components/member/member.model';
import { GroupDocumentInterface } from './../interfaces/group.interface';
import { LeanDocument } from 'mongoose';


export const createValidGroup = async (value: any, user: UserDocumentInterface): Promise<GroupDocumentInterface> => {
    const group = new GroupModel({owner: user._id,...value});
    const errors = await group.validateData();

    if (errors.length) 
        throw new ErrorWithMessages("unprocessableEntity", errors);

    return group;
}

export const checkGroupUniqueness = async (name: string): Promise<void> => {
    const existGroup = await GroupModel.findOne({name}).select('_id');
    if (existGroup) 
        throw new ErrorWithMessages("conflict", ["Name group already taken"]);
}

export const saveGroup = async (group: GroupDocumentInterface) => {
    await group.save();
}

export const groupUsers = async (id: string, page: string = null): Promise<LeanDocument<MemberDocumentInterface>[]> => {
    const pageQuery = (+page || 1) - 1;
    const users = await MemberModel
        .find({
            group: id
        })
        .skip(pageQuery * 20)
        .limit(20)
        .select('-__v -group')
        .lean()
        .populate('user', {username: 1, email: 1, avatar: 1})
        .lean()
        

    if (!users.length) 
        throw new ErrorWithMessages("notFound", ["No Users found for this group"]);

    return users;
    
}

export const recoverGroup = async (id: string) => {
    const group = await GroupModel.findById(id).select("-lastModifiedOn -userCount").lean().populate("owner",{ username: 1 });
    if (!group) 
        throw new ErrorWithMessages("notFound", ["This group not exist"]);
    
    return group;

}

export const groupUsersCount = async (id: string) => {
    const count = (await GroupModel.findById(id).select("userCount")).userCount;

    if (!count) 
        throw new ErrorWithMessages("notFound", ["No Users found for this group"]);

    return count;
}