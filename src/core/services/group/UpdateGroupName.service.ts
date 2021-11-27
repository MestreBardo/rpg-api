import { Group } from "../../../common/entities/Group.entity";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { VerifyGroupService } from "./VerifyGroup.service";
import { VerifyGroupDuplictyService } from "./VerifyGroupDuplicity.service";
import { VerifyUserGroupService } from "./VerifyUserGroup.service";

class UpdateGroupNameService {
    static async execute(userId: string, groupId: string, groupUpdate: any): Promise<Group> {
        await VerifyGroupService.execute(groupId);
        await VerifyGroupDuplictyService.execute(groupUpdate.name);
        await VerifyUserGroupService.execute(userId, groupId);
        const updatedGroup = await GroupRepository.updateName(groupId, groupUpdate.name);
        return updatedGroup;
    }
}

export { UpdateGroupNameService };