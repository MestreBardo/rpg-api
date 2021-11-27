import { Response, Request } from 'express';
import { HttpStatus } from "../../common/constants/HttpStatus.enum";

class HttpSendService{
    static execute(req: Request, res: Response, httpStatus: HttpStatus, data: any){
        res.status(httpStatus).json({
            uri: req.originalUrl,
            method: req.method,
            data
        });
    }
}
export { HttpSendService };