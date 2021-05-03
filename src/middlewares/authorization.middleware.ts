import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import httpResponse from "../common/http-response"

const checkTokenValidity = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization?.split(" ")[1];
        if (!authorization) 
            return httpResponse.unauthorized(["Token is not send"])
        const token = verify(authorization, `${process.env.TOKEN}`)
    } catch (error) {
        return httpResponse.unauthorized(["Token is not valid"])
    }
    

}



export {
    checkTokenValidity
}