"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateUserSevice = void 0;
const User_builder_1 = require("../../common/builders/User.builder");
const bcrypt_1 = require("bcrypt");
class GenerateUserSevice {
    static async execute(args) {
        const { name, surname, username, email, gender, country, city, birthday, password, external } = args;
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_builder_1.UserBuilder(email)
            .setName(name)
            .setSurname(surname)
            .setUsername(username)
            .setPassword(hashedPassword)
            .setGender(gender)
            .setCountry(country)
            .setCity(city)
            .setBirthday(birthday)
            .setExternal(external)
            .build();
        return user;
    }
}
exports.GenerateUserSevice = GenerateUserSevice;
