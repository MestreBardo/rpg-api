import { User } from "../../../common/entities/User.entity";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { CompareMemberRolesService } from "./CompareMemberRoles.service";

class PromoteMemberService {
    static async execute(user: User, member: any) {
        const memberToPromote = await MemberRepository.findById(member["id"]);
        const memberRequested = await MemberRepository.findByUserOnGroup(user["_id"], memberToPromote["group"]);
        CompareMemberRolesService.execute(memberRequested, memberToPromote);
        const promotedMember = await MemberRepository.promoteUser(memberToPromote["_id"]);
        return promotedMember;
    }
}

export { PromoteMemberService };