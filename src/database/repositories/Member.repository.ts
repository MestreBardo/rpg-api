import { Member } from "../../common/entities/Member.entity";
import { MemberMongoose } from "../models/Member.mongoose";

class MemberRepository {
    static async removeMemberById(id: any) {
        await MemberMongoose.model.findByIdAndRemove(
            {
                id
            }
        );
    }
    static async removeMember(user: string, group: string): Promise<void> {
        await MemberMongoose.model.findOneAndDelete(
            {
                user,
                group
            }
        );


        
    }

    static async findGroupsByUser(userId: string): Promise<Member[]> {
        const members = await MemberMongoose.model.find(
            {
                user: userId
            }
        )
        .populate(
            {
                path:"group",
                select: "_id name description userCount"
            }
        )
        .lean();

        return members;
    }

    static async findByGroup(group: string, username: string, page: number = 1): Promise<Member[]> {
        const members = await MemberMongoose.model.find(
            {
                group
            }
        )
        .populate(
            {
                path:"user",
                match: {
                    username: new RegExp(username, "i")
                },
                select: "_id username name surname email"
            }
        )
        .skip(
            (page - 1) * 20
        ).limit(
            20
        )
        .lean();

        return members;
    }

    static async removeUser(id: string): Promise<void> {
        await MemberMongoose.model.findByIdAndRemove(
            id
        );

    }

    static async demoteUser(id: string): Promise<Member> {
        const demotedUser = await MemberMongoose.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    role: "user"
                }
            },
            {
                new: true
            }
        )
        .populate("user")
        .lean();

        return demotedUser;
    }

    static async promoveUser(id: string): Promise<Member> {
        const promovedUser = await MemberMongoose.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    role: "admin"
                }
            },
            {
                new: true
            }
        )
        .populate("user")
        .lean();

        return promovedUser;
    }

    static async findUserByGroup(groupId: string, page: number): Promise<Member[]> {
        const members = await MemberMongoose.model.find(
            {
                group: groupId
            }
        )
        .skip(
            (page - 1) * 20
        ).limit(
            20
        )
        .populate(
            {
                path:"user",
                select: "_id username name surname email"
            }
        )
        .lean();

        return members;
    }

    static async createOne(group: Member): Promise<Member> {
        const createdMember = new MemberMongoose.model(group);
        await createdMember.save();

        return createdMember.toJSON();
    }
    

    static async findByUserOnGroup(user: string, group: string): Promise<Member> {
        const member = await MemberMongoose.model.findOne(
            {
                user,
                group
            }
        )
        .lean();


        return member;
    }


    static async findById(id: string): Promise<Member> {
        const member = await MemberMongoose.model.findById(
            id
        )
        .lean();

        return member;
    }
}

export {
    MemberRepository
}