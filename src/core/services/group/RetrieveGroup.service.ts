import { Group } from "../../../common/entities/Group.entity";
import { User } from "../../../common/entities/User.entity";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { VerifyGroupService } from "./VerifyGroup.service";

class RetrieveGroupService {
    static async execute(user: User, groupId: string) {
        const groupFinded = await VerifyGroupService.execute(groupId);
        const member = await MemberRepository.findByUserOnGroup(user["_id"], groupFinded["_id"]);
        return {
            ...groupFinded,
            me: member,
        };
    }
}

export { RetrieveGroupService };