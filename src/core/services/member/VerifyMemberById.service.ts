import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { Member } from "../../../common/entities/Member.entity";
import { HttpError } from "../../../common/responses/HttpError";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class VerifyMemberByIdService {
    static async execute(id: string): Promise<Member> {
        const memberInDatabase = await MemberRepository.findById(id);
        if (!memberInDatabase) {
            throw new HttpError(HttpStatus.NOTFOUND, "Member not found");
        }
        return memberInDatabase;
    }
}

export default VerifyMemberByIdService;