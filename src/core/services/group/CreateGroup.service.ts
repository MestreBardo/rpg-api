import { User } from "../../../common/entities/User.entity";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateGroupSevice } from "../GenerateGroup.service";
import { GenerateMemberService } from "../GenerateMember.service";
import { VerifyGroupDuplictyService } from "./VerifyGroupDuplicity.service";

class CreateGroupService {
    static async execute(user: User, group: any) {
        await VerifyGroupDuplictyService.execute(group);
        const newGroup = GenerateGroupSevice.execute({ owner: user["_id"], ...group });
        const createdGroup = await GroupRepository.createOne(newGroup);
        const newMember = GenerateMemberService.execute({
            group: createdGroup["_id"],
            user: user["_id"],
            role: "owner",
        });
        const createdMember = await MemberRepository.createOne(newMember);
        await UserRepository.addGroup(createdMember["user"]);
        return {
            ...createdGroup,
            me: createdMember
        }
    }
}

export { CreateGroupService };
