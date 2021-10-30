"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPasswordService = void 0;
const bcrypt_1 = require("bcrypt");
class CheckPasswordService {
    static async execute(password, databasepassword) {
        const match = await (0, bcrypt_1.compare)(password, databasepassword);
        return match;
    }
}
exports.CheckPasswordService = CheckPasswordService;
