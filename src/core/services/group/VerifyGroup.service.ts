import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class VerifyGroupService {
    static async execute(groupId: string) {
        const group = await GroupRepository.findById(groupId);
        if (!group) {
            throw new HttpError(HttpStatus.NOTFOUND, 'Group not found');
        }
        return group;
    }
}

export { VerifyGroupService };