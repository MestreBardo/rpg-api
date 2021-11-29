import { NextFunction } from 'express';
import { Response } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { CreateSessionService } from '../../core/services/session/CreateSession.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
class CreateSessionController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedSession = req.body;
            const session = await CreateSessionService.execute(user["_id"], receivedSession);
            HttpSendService.execute(req, res, HttpStatus.OK, session) 
        } catch (error) {
            next(error);
        }
    }
}

export { CreateSessionController };