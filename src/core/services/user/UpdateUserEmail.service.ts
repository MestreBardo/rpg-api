import { compare } from 'bcrypt';
import { HttpStatus } from '../../../common/constants/HttpStatus.enum';
import { User } from "../../../common/entities/User.entity";
import { HttpError } from '../../../common/responses/HttpError';
import { UserRepository } from '../../../database/repositories/User.repository';

class UpdateUserEmailService {
    static async execute(user: User, update: any): Promise<User> {
        const userInDatabase = await UserRepository.findByUsernameOrEmail(update.email, update.email);
        if (userInDatabase) throw new HttpError(HttpStatus.CONFLICT, 'Email already in use');

        const isMatch = await compare(user.password, update.confirmationPassword);
        if (!isMatch) throw new HttpError(HttpStatus.UNAUTHORIZED, 'Password does not match');

        const updatedUser = await UserRepository.updateEmailById(user["_id"], update["email"]);
        return updatedUser;
    }
}

export { UpdateUserEmailService };