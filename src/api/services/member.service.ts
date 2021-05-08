import {
    MemberDocumentInterface,
} from './../interfaces/member.interface';
import {
    GroupDocumentInterface
} from './../interfaces/group.interface';
import {
    UserDocumentInterface
} from "../interfaces/user.interface";
import MemberModel from '../components/member/member.model';

export const createMember = async (user: UserDocumentInterface, group: GroupDocumentInterface, role: string): Promise<MemberDocumentInterface> => {
    const member = new MemberModel({
        userId: user._id,
        username: user.username,
        email: user.email,
        groupId: group._id,
        groupName: group.name,
        role
    })

    await member.save();

    return member;
}