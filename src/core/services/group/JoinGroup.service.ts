import { Group } from "../../../common/entities/Group.entity";
import { User } from "../../../common/entities/User.entity";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateMemberService } from "../GenerateMember.service";
import { VerifyUserGroupDuplicityService } from "./VerifyUserGroupDuplicity.service";

class JoinGroupService {
    static async execute(user: User, group: any) {
        await VerifyUserGroupDuplicityService.execute(user["_id"], group["_id"] || group["id"]);
        const member = GenerateMemberService.execute({user: user["_id"], group: group["_id"] || group["id"], role: "user"});
        const createdMember = await MemberRepository.createOne(member);
        const updatedGroup = await GroupRepository.addMember(group["_id"] || group["id"]);
        await UserRepository.addGroup(user["_id"]);

        return {
            ...updatedGroup,
            me: createdMember
        };


    }
}

export { JoinGroupService };