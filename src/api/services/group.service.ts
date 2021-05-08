import ErrorWithMessages from '../common/errorWithMessages';
import GroupModel from '../components/groups/group.model';
import MemberModel from '../components/member/member.model';
import { GroupDocumentInterface } from './../interfaces/group.interface';


export const createValidGroup = async (value: any): Promise<GroupDocumentInterface> => {
    const group = new GroupModel(value);
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

export const groupUsers = async (id: string, page: string = null) => {
    const pageQuery = (+page || 1) - 1;
    const users = await MemberModel
        .find({
            groupId: id
        })
        .skip(pageQuery * 20)
        .limit(20)
        .select('-__v -groupId -groupName -_id')

    if (!users.length) 
        throw new ErrorWithMessages("notFound", ["No Users found for this group"]);

    return users;
    
}

export const groupUsersCount = async (id: string) => {
    const count = (await GroupModel.findById(id).select("userCount")).userCount;

    if (count) 
        throw new ErrorWithMessages("notFound", ["No Users found for this group"]);

    return count;
}