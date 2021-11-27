import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { User } from "../../../common/entities/User.entity";
import { HttpError } from "../../../common/responses/HttpError";
import { UserRepository } from "../../../database/repositories/User.repository";

class VerifyUserDuplicityService {
    static async execute(user: User) {
        const userInDatabase = await UserRepository.findByUsernameOrEmail(user.username, user.email);
        if (userInDatabase) {
            const errors = [];
            if (userInDatabase.username === user.username) {
                errors.push("Username already in use");
            };
            if (userInDatabase.email === user.email) {
                errors.push("Email already in use");
            };
            throw new HttpError(HttpStatus.CONFLICT, errors);
        }
    }
}

export { VerifyUserDuplicityService };