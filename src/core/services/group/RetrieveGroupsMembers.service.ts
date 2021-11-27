import { MemberRepository } from "../../../database/repositories/Member.repository";
import { VerifyGroupService } from "./VerifyGroup.service";

class RetrieveGroupMembersService {
    static async execute(groupId: string, searchParams: any) {
        const { username, page } = searchParams;
        await VerifyGroupService.execute(groupId)
        const members = MemberRepository.findByGroup(groupId, username, +page);
        return members;
    }
}

export { RetrieveGroupMembersService };