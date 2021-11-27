import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { Member } from "../../../common/entities/Member.entity";
import { HttpError } from "../../../common/responses/HttpError";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class VerifyUserGroupService {
    static async execute(userId: string, groupId: string): Promise<Member> {
        const member = await MemberRepository.findByUserOnGroup(userId, groupId);
        if(!member) throw new HttpError(HttpStatus.NOTFOUND, "User is not member of this group");
        return member;
        
    }
}
export { VerifyUserGroupService };