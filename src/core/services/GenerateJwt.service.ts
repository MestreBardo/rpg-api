import { sign } from 'jsonwebtoken';

class GenerateJwtService {
    static execute(user: any): string {
    
        const token = sign(
            user,
            process.env.TOKEN,
            {
                issuer: process.env.ISSUER,
                audience: "webapp",
                subject: String(user._id)
            }
        )
        return token;

        
    }
}

export {
    GenerateJwtService
}