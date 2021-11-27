import { Member } from "../../../common/entities/Member.entity";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class RetrieveUserGroupsService {
    static async execute(userId: string): Promise<Member[]> {
        const userGroups = await MemberRepository.findGroupsByUser(userId);

        return userGroups;
    }
}

export { RetrieveUserGroupsService };