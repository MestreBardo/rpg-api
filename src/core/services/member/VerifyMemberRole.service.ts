import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class VerifyMemberRoleService {

    static async execute (userId: string, groupId: string): Promise<void> {
        const member = await MemberRepository.findByUserOnGroup(userId, groupId);
        if (!member) {
            throw new HttpError(HttpStatus.NOTFOUND, 'User is not a member of this group');
        }

        if (!["owner", "admin"].includes(member.role)) {
            throw new HttpError(HttpStatus.UNAUTHORIZED, 'User is not an admin or owner of this group');
        }
    }
}

export { VerifyMemberRoleService };