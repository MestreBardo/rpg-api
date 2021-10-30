import { User } from './../../common/entities/User.entity';
import { UserBuilder } from "../../common/builders/User.builder";
import { hash } from "bcrypt"

class GenerateUserSevice {
    static async execute(args: any): Promise<User> {
        const {
            name, 
            surname,
            username, 
            email, 
            gender, 
            country, 
            city, 
            birthday, 
            password, 
            external 
        } = args;

        const hashedPassword = await hash(password, 10);

        const user = new UserBuilder(email)
            .setName(name)
            .setSurname(surname)
            .setUsername(username)
            .setPassword(hashedPassword)
            .setGender(gender)
            .setCountry(country)
            .setCity(city)
            .setBirthday(birthday)
            .setExternal(external)
            .build()

        return user;
    }
}

export {
    GenerateUserSevice
}