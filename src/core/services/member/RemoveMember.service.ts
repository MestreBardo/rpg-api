import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class RemoveMemberService {
    static async execute(user, member, group) {

        console.log(member);
        console.log(group);
        const membro = await MemberRepository.findById(member);
        console.log(membro);
        await PlayerRepository.removePlayerGroupCampaigns(membro.user, membro.group);
        console.log("teste");
        await MemberRepository.removeMemberById(member);
        console.log("teste");
        await GroupRepository.removeMember(group);
    }
}

export { RemoveMemberService };