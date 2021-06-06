import {
    MemberDocumentInterface,
} from './../interfaces/member.interface';
import {
    GroupDocumentInterface
} from './../interfaces/group.interface';
import {
    UserDocumentInterface
} from "../interfaces/user.interface";
import MemberModel from '../components/members/member.model';

export const createMember = async (user: any, group: any, role: string): Promise<MemberDocumentInterface> => {
    const member = new MemberModel({
        user: user._id,
        group: group._id,
        role
    })

    await member.save();

    return member;
}