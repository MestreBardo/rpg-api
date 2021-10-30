"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMemberService = void 0;
const Member_builder_1 = require("../../common/builders/Member.builder");
class GenerateMemberService {
    static execute(args) {
        const { user, group, role } = args;
        const member = new Member_builder_1.MemberBuilder()
            .setUser(user)
            .setGroup(group)
            .setRole(role)
            .build();
        return member;
    }
}
exports.GenerateMemberService = GenerateMemberService;
