import { Group } from "../../common/entities/Group.entity";
import { GroupMongoose } from "../models/Group.mongoose";

class GroupRepository {
    static async findByMany(name: string, page: number, lean: boolean = false): Promise<Group[]> {
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
    static async updateOne(groupId: string, groupReceived: Group): Promise<Group> {
        const { description, isPublic, system } = groupReceived;
        const group = await GroupMongoose.model.findById(
            groupId
        );

        group.description = description || group.description;
        group.isPublic = isPublic ?? group.isPublic;
        group.system = system || group.system;

        await group.save();

        return group.toJSON();
    }
    static async patchName(groupId: string, name: any): Promise<Group> {
        const group = await GroupMongoose.model.findById(
            groupId
        );

        group.name = name;

        await group.save();

        return group.toJSON();
    }
    static async findById(groupId: string, lean: boolean = false): Promise<Group> {
        const group = await GroupMongoose.model.findById(
            groupId
        );

        if (group && lean)
            return group.toJSON();
        
        return group;
    }
    static async addMember(groupId: string): Promise<Group> {
        const group = await GroupMongoose.model.findById(
            groupId
        );
        group.userCount++;
        await group.save();

        return group.toJSON();
    }
    static async removeMember(groupId: string): Promise<Group> {
        const group = await GroupMongoose.model.findById(
            groupId
        );
        group.userCount--;
        await group.save();

        return group.toJSON();
    }

    static async createOne(group: Group, lean: boolean = false): Promise<Group> {
        const createdGroup = await GroupMongoose.model.create(group);
        createdGroup.userCount++;
        await createdGroup.save();

        return createdGroup.toJSON();
    }

    static async findByName(name: string, lean: boolean = false): Promise<Group> {
        const group = await GroupMongoose.model.findOne(
            {
                name
            }
        );

        if (group && lean)
            return group.toJSON();
        
        return group;
    }
}

export {
    GroupRepository
}