import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";

class JwtVerification {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers["authorization"].split(" ")[1];
        verify(
            token,
            process.env.TOKEN, 
            (err, decoded) => {
                if(err)
                    return HttpResponse.create(
                        HttpStatus.unauthorized,
                        req,
                        res,
                        "Token is not valid"
                    )
            
                req.token = decoded;
                next();
            }
        );
    }
}

export {
    JwtVerification
}