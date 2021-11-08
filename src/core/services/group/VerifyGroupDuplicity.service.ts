import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { Group } from "../../../common/entities/Group.entity";
import { HttpError } from "../../../common/responses/HttpError";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class VerifyGroupDuplictyService {
    static async execute(group: Group) {
        const groupInDatabe = await GroupRepository.findByName(group.name);
        if (groupInDatabe) {
            throw new HttpError(HttpStatus.CONFLICT,"Group already exists");
        }
    }
}

export { VerifyGroupDuplictyService };