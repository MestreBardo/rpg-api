import { Group } from "../../../common/entities/Group.entity";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { VerifyGroupService } from "./VerifyGroup.service";
import { VerifyUserGroupService } from "./VerifyUserGroup.service";

class UpdateGroupService {
    static async execute(userId: string, groupId: string, groupUpdate: any): Promise<Group> {
        await VerifyGroupService.execute(groupId);
        await VerifyUserGroupService.execute(userId, groupId);
        const updatedGroup = await GroupRepository.updateOne(groupId, groupUpdate);
        return updatedGroup;
    }
}

export { UpdateGroupService };