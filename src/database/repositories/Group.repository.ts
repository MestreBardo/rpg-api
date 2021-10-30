import { Group } from "../../common/entities/Group.entity";
import { GroupMongoose } from "../models/Group.mongoose";

class GroupRepository {
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