import { compare } from 'bcrypt';
import { HttpStatus } from '../../../common/constants/HttpStatus.enum';
import { User } from "../../../common/entities/User.entity";
import { HttpError } from '../../../common/responses/HttpError';
import { UserRepository } from '../../../database/repositories/User.repository';

class UpdateUserPasswordService {
    static async execute(user: User, update: any): Promise<User> {

        const isMatch = await compare(user.password, update.confirmationPassword);
        if (!isMatch) throw new HttpError(HttpStatus.UNAUTHORIZED, 'Password does not match');

        const updatedUser = await UserRepository.updatePasswordById(user["_id"], update["password"]);
        return updatedUser;
    }
}

export { UpdateUserPasswordService };