import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpError } from "../../../common/responses/HttpError";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { JwtValidator } from "../../../common/validators/Auth/Jwt.joi";
import { Validator } from "../../../helpers/Validator";
import { RetrieveUserService } from "../../services/user/RetrieveUserService.service";

class JwtVerificationMiddleware {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        const headers = req.headers;
        Validator.validate(JwtValidator.schema, headers)
        const { authorization } = headers;
        const token = authorization.split(" ")[1];
        verify(
            token,
            process.env.TOKEN, 
            (err, decoded) => {
                if(err) throw new HttpError(HttpStatus.UNAUTHORIZED, err.message);
                const user = RetrieveUserService.execute(decoded.sub);
                req.user = user;
                next();
            }
        );
    }
}

export {
    JwtVerificationMiddleware
}