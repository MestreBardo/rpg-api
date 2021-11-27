import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { Member } from "../../../common/entities/Member.entity";
import { HttpError } from "../../../common/responses/HttpError";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class VerifyMemberByGroupAndUserService {
    static async execute(userId: string, groupId: string): Promise<Member> {
        const memberInDatabase = await MemberRepository.findByUserOnGroup(userId, groupId);
        if (!memberInDatabase) {
            throw new HttpError(HttpStatus.NOTFOUND, "Member not found");
        }
        return memberInDatabase;
    }
}

export { VerifyMemberByGroupAndUserService };