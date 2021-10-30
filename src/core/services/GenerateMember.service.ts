import { MemberBuilder } from "../../common/builders/Member.builder";
import { Member } from "../../common/entities/Member.entity";

class GenerateMemberService {
    static execute(args: any): Member {
        const {
            user, 
            group,
            role
        } = args;

        const member = new MemberBuilder()
            .setUser(user)
            .setGroup(group)
            .setRole(role)
            .build()

        return member;
    }
}

export {
    GenerateMemberService
}