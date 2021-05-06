import { Response, Request, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import RequestWithUserInterface from "../interfaces/requestWithUser.interface";
import httpResponse from "../services/httpResponse.service"

const checkTokenValidity = (req: RequestWithUserInterface, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization?.split(" ")[1];
        if (!authorization) 
            return httpResponse.unauthorized(res, ["Token is not send"]);
        const token = verify(authorization, `${process.env.TOKEN}`);
        req.user = token;
        next();
    } catch (error) {
        return httpResponse.unauthorized(res, ["Token is not valid"]);
    }
    

}

const checkUserOwnership = (req: RequestWithUserInterface, res: Response, next: NextFunction) => {
    try {
        if (req.user._id !== req.params.id) {
            return httpResponse.unauthorized(res, ["You don't own this user."]);
        }
        next();
    } catch (error) {
        return httpResponse.internalServerError(res, ["Somenthing went wrong"]);
    }
    

}

const methodNotAllowed = (req: Request, res: Response) => {
    return httpResponse.methodNotAllowed(res, ["This method is not allowed"]);
}



export {
    methodNotAllowed,
    checkTokenValidity,
    checkUserOwnership
}