import { Player } from "../../common/entities/Player.entity";
import { PlayerMongoose } from "../models/Player.mongoose";

class PlayerRepository {
    // static async removePlayer(campaignId: string, userId: any) {
    //     throw new Error("Method not implemented.");
    // }
    // static async findOneByUser(userId: any) {
    //     throw new Error("Method not implemented.");
    // }
    static async removePlayer(user: string, campaign: string): Promise<void> {
        await PlayerMongoose.model.findOneAndDelete(
            {
                user,
                campaign
            }
        );


        
    }

    static async findByUser(user: string): Promise<Player> {
        const player = await PlayerMongoose.model.findOne(
            {
                user
            }
        )
        .lean();

        return player;

    }

    static async updateTemplate(campaignId: string, template: any): Promise<void> {
        await PlayerMongoose.model.updateMany(
            {
                campaign: campaignId,
            },
            {
                $set: {
                    template
                }
            }
        );
    }

    static async findUserGroupActiveCampaigns(userId: string, groupId: string): Promise<any[]> {
        const groups = await PlayerMongoose.model.find(
            {
                user: userId
            }
        ).populate('campaign', {
            match: {
                group: groupId,
                active: true
            }
        }).lean();

        return groups;

    }

   

    // static async findUserByGroup(groupId: string, page: number): Promise<Member[]> {
    //     const members = await MemberMongoose.model.find(
    //         {
    //             group: groupId
    //         }
    //     )
    //     .skip(
    //         (page - 1) * 20
    //     ).limit(
    //         20
    //     )
    //     .populate(
    //         {
    //             path:"user",
    //             select: "_id username name surname email"
    //         }
    //     )
    //     .lean();

    //     return members;
    // }

    static async createOne(player: any): Promise<Player> {
        const createdPlayer = new PlayerMongoose.model(player);
        await createdPlayer.save();

        return createdPlayer.toJSON();
    }
    

    static async findByUserOnCampaign(user: string, campaign: string): Promise<Player> {
        const player = await PlayerMongoose.model.findOne(
            {
                user,
                campaign
            }
        )
        .lean();

        return player;

    }


    // static async findById(memberId: string, lean: boolean = false): Promise<Member> {
    //     const member = await MemberMongoose.model.findById(
    //         memberId
    //     );

    //     if (lean && member)
    //         return member.toJSON();

    //     return member;
    // }
}

export {
    PlayerRepository
}