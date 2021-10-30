"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateGroupSevice = void 0;
const Group_builder_1 = require("../../common/builders/Group.builder");
class GenerateGroupSevice {
    static execute(args) {
        const { name, description, system, owner, isPublic } = args;
        const group = new Group_builder_1.GroupBuilder()
            .setName(name)
            .setDescription(description)
            .setSystem(system)
            .setOwner(owner)
            .setIsPublic(isPublic)
            .build();
        return group;
    }
}
exports.GenerateGroupSevice = GenerateGroupSevice;
