import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";

class UserPossession {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        const userTokenId = req.user._id;
        const { userId } = req.params;
        if(userTokenId !== userId)
            return HttpResponse.create(
                HttpStatus.unauthorized,
                req,
                res,
                "User not own this user"
            )
        

            next();

    }
}

export {
    UserPossession
}