import { User } from "../../../common/entities/User.entity";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { VerifyCampaignUserGroupService } from "../campaign/VerifyCampaignUserOwnerGroup.service";
import { VerifyUserGroupService } from "./VerifyUserGroup.service";

class LeaveGroupService {
    static async execute(user: User, group: any) {
        await VerifyUserGroupService.execute(user["_id"], group["_id"] || group["id"]);
        await VerifyCampaignUserGroupService.execute(user["_id"], group["_id"] || group["id"]);
        await MemberRepository.removeMember(user["_id"], group["_id"] || group["id"]);
        const updatedGroup = await GroupRepository.removeMember(group["_id"] || group["id"]);
        await UserRepository.removeGroup(user["_id"]);
        

        return {
            ...updatedGroup,
            me: null,
            removedUser: user["_id"]
        };


    }
}

export { LeaveGroupService };