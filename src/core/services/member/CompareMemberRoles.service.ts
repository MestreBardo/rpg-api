import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { Member } from "../../../common/entities/Member.entity";
import { HttpError } from "../../../common/responses/HttpError";

class CompareMemberRolesService {
    static async execute(memberRequested: Member, memberToUpdate: Member): Promise<void> {
        if (memberRequested["_id"] === memberToUpdate["_id"]) throw new HttpError(HttpStatus.UNAUTHORIZED, "You can't do this to yourself");
        if (memberToUpdate.role === "owner") throw new HttpError(HttpStatus.UNAUTHORIZED, "You can't do this to an owner");
        if (memberRequested.role === "user") throw new HttpError(HttpStatus.UNAUTHORIZED, "You can't do this");
    }
}

export { CompareMemberRolesService };