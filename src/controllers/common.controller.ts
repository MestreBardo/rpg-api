
import { Response, NextFunction, Request } from 'express';
import httpResponse from '../common/http-response';
const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
    return httpResponse.methodNotAllowed(["This method is not allowed"]);
}

const notImplemented = (req: Request, res: Response, next: NextFunction) => {
    return httpResponse.notImplemented(["This entity is not implemented"]);
}

export {
    methodNotAllowed,
    notImplemented
}