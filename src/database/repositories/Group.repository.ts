import { Group } from "../../common/entities/Group.entity";
import { GroupMongoose } from "../models/Group.mongoose";

class GroupRepository {
    static async findMany(name: string, page: number): Promise<Group[]> {
        const nameRegex = new RegExp(name, "ig")
        const groups = await GroupMongoose.model.find(
            {name: nameRegex}
        )
        .populate(
            {
                path:"owner",
                select: "_id username name surname email"
            }
        )
        .skip(
            (page - 1) * 20
        ).limit(
            20
        ).lean();

        return groups
    }
    static async updateOne(id: string, groupUpdate: Group): Promise<Group> {
        Object.keys(groupUpdate).forEach(
            key => {
                if (!groupUpdate[key])
                    delete groupUpdate[key];
            }
        )
        const updatedGroup = await GroupMongoose.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...groupUpdate
                }
            },
            {
                new: true
            }
        )
        .lean();

        return updatedGroup;
    }
    static async patchName(id: string, name: any): Promise<Group> {
        const group = await GroupMongoose.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    name
                }
            },
            {
                new: true
            }
        )
        .lean();
        return group;
    }
    static async findById(groupId: string): Promise<Group> {
        const group = await GroupMongoose.model.findById(
            groupId
        )
        .lean();
        
        return group;
    }
    static async addMember(id: string): Promise<void> {
        await GroupMongoose.model.findByIdAndUpdate(
            id,
            {
                $inc: {
                    userCount: 1
                }
            }
        );
    }
    static async removeMember(id: string): Promise<void> {
        await GroupMongoose.model.findByIdAndUpdate(
            id,
            {
                $inc: {
                    userCount: -1
                }
            }
        );

    }

    static async createOne(group: Group): Promise<Group> {
        const createdGroup = new GroupMongoose.model(group);
        createdGroup.userCount = 1;
        await createdGroup.save();

        return createdGroup.toJSON();
    }

    static async findByName(name: string): Promise<Group> {
        const group = await GroupMongoose.model.findOne(
            {
                name
            }
        )
        .lean();

        return group;
    }
}

export {
    GroupRepository
}