import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class VerifyUserGroupDuplicityService {
    static async execute(userId: string, groupId: string): Promise<void> {
        const member = await MemberRepository.findByUserOnGroup(userId, groupId);
        if(member) throw new HttpError(HttpStatus.CONFLICT, 'User already on group');
        
    }
}
export { VerifyUserGroupDuplicityService };