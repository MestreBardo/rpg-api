import { compare } from 'bcrypt';
import { HttpStatus } from '../../../common/constants/HttpStatus.enum';
import { User } from "../../../common/entities/User.entity";
import { HttpError } from '../../../common/responses/HttpError';
import { UserRepository } from '../../../database/repositories/User.repository';

class UpdateUserUsernameService {
    static async execute(user: User, update: any): Promise<User> {
        const userInDatabase = await UserRepository.findByUsernameOrEmail(update.username, update.username);
        if (userInDatabase) throw new HttpError(HttpStatus.CONFLICT, 'Email already in use');

        const isMatch = await compare(update.confirmationPassword, user.password);
        if (!isMatch) throw new HttpError(HttpStatus.UNAUTHORIZED, 'Password does not match');

        const updatedUser = await UserRepository.updateUsernameById(user["_id"], update["username"]);
        return updatedUser;
    }
}

export { UpdateUserUsernameService };