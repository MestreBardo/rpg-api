import { User } from "../../../common/entities/User.entity";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { CompareMemberRolesService } from "./CompareMemberRoles.service";

class DemoteMemberService {
    static async execute(user: User, member: any) {
        const memberToDemote = await MemberRepository.findById(member["id"]);
        const memberRequested = await MemberRepository.findByUserOnGroup(user["_id"], memberToDemote["group"]);
        CompareMemberRolesService.execute(memberRequested, memberToDemote);
        const demotedMember = await MemberRepository.demoteUser(memberToDemote["_id"]);
        return demotedMember;
    }
}

export { DemoteMemberService };