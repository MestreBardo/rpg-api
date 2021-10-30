import { Member } from "../../common/entities/Member.entity";
import { MemberMongoose } from "../models/Member.mongoose";

class MemberRepository {
    static async removeMember(user: string, group: string): Promise<void> {
        await MemberMongoose.model.findOneAndDelete(
            {
                user,
                group
            }
        );


        
    }

    static async removeUser(memberId: string): Promise<void> {
        await MemberMongoose.model.findByIdAndRemove(
            memberId
        );

    }

    static async demoteUser(memberId: string): Promise<Member> {
        const member = await MemberMongoose.model.findById(
            memberId
        );

        member.role = "user";
        await member.save();

        return member.toJSON();
    }

    static async promoveUser(memberId: string): Promise<Member> {
        const member = await MemberMongoose.model.findById(
            memberId
        );

        member.role = "admin";
        await member.save();

        return member.toJSON();
    }

    static async createOne(group: Member, lean: boolean = false): Promise<Member> {
        const createdMember = await MemberMongoose.model.create(group);
        await createdMember.save();

        return createdMember.toJSON();
    }
    

    static async findByUserOnCampaign(user: string, group: string, lean: boolean = false): Promise<Member> {
        const member = await MemberMongoose.model.findOne(
            {
                user,
                group
            }
        )

        if (lean && member)
            return member.toJSON();

        return member;
    }


    static async findById(memberId: string, lean: boolean = false): Promise<Member> {
        const member = await MemberMongoose.model.findById(
            memberId
        );

        if (lean && member)
            return member.toJSON();

        return member;
    }
}

export {
    MemberRepository
}