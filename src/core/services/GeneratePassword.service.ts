import { hash } from "bcrypt";

class GeneratePasswordService {
    static async execute(password: string): Promise<string> {
        const hashed = await hash(password, 10);
        return hashed;
    }
}

export {
    GeneratePasswordService
}