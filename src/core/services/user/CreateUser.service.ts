import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateUserSevice } from "./GenerateUser.service";

class CreateUserService {
    static async execute(user: any) {
        const generatedUser = await GenerateUserSevice.execute(user);
        const userInDatabase = await UserRepository.findByUsernameOrEmail(generatedUser.username, generatedUser.email);
        if (userInDatabase) {
            throw new HttpError(HttpStatus.CONFLICT,"User already exists");
        };
        const newUser = await UserRepository.createOne(generatedUser);
        return newUser;
    }
}

export { CreateUserService };