import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { UserRepository } from "../../../database/repositories/User.repository";

class RetrieveUserService {
    static async execute(id: string) {
        const user = await UserRepository.findOneById(id);
        if (!user) {
            throw new HttpError(HttpStatus.NOTFOUND, 'User not found');
        }
        return user;
    }
}

export { RetrieveUserService };