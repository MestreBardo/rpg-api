import { GroupBuilder } from "../../common/builders/Group.builder";
import { Group } from "../../common/entities/Group.entity";

class GenerateGroupSevice {
    static execute(args: any): Group {
        const {
            name, 
            description,
            system, 
            owner,
            isPublic
        } = args;

        const group = new GroupBuilder()
            .setName(name)
            .setDescription(description)
            .setSystem(system)
            .setOwner(owner)
            .setIsPublic(isPublic)
            .build()

        return group;
    }
}

export {
    GenerateGroupSevice
}