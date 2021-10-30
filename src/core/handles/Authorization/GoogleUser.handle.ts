import { NextFunction, Request, Response } from 'express';
import { GoogleAuthRepository } from '../../../database/repositories/GoogleAuth.repository';
import { HttpStatus } from '../../../common/constants/HttpStatus.enum';
import { HttpResponse } from '../../../common/responses/HttpResponse.factory';

class GoogleUser {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { code: userCode } = req.body;
            const user = await GoogleAuthRepository.findOne(userCode as string);

            next();

        } catch (error) {
            return HttpResponse.create(
                +error.code || HttpStatus.internalServerError,
                req,
                res,
                error.message
            )

        }
        
        
    }
}

export {
    GoogleUser
}