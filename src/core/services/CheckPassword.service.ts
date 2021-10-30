import { compare } from "bcrypt";

class CheckPasswordService {
    static async execute(password: string, databasepassword: string): Promise<boolean> {
        const match = await compare(password, databasepassword);
        return match;
    }
}

export {
    CheckPasswordService
}