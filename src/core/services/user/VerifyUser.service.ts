import { compare } from 'bcrypt';
import { HttpStatus } from '../../../common/constants/HttpStatus.enum';
import { User } from '../../../common/entities/User.entity';
import { HttpError } from '../../../common/responses/HttpError';
import { UserRepository } from '../../../database/repositories/User.repository';

class VerifyUserService {
    static async execute(user: any, receivedPassword: string): Promise<User> {
        const userInDatabase = await UserRepository.findByUsernameOrEmail(user.login, user.login);
        if (!user) {
            throw new HttpError(HttpStatus.NOTFOUND, 'User not found');
        };
        const isMatch = await compare(receivedPassword, user.password);
        if (!isMatch) {
            throw new HttpError(HttpStatus.UNAUTHORIZED, 'Invalid password');
        };

        return userInDatabase;
    }
}

export { VerifyUserService };