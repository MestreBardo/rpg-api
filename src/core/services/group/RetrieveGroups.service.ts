import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class RetrieveGroupsService {
    static async execute(searchParams: any, userId: string) {
        const { name, page } = searchParams;
        const groupsFinded: any[] = await GroupRepository.findMany(name, page);
        for await (const group of groupsFinded) {
            group.me = await MemberRepository.findByUserOnGroup(userId, group._id.toString());
        }
        return groupsFinded;
    }
}

export { RetrieveGroupsService };